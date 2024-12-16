'use client';

import { useMigration } from '@/hooks/useMigration';
import { createClient } from '@/supabase-clients/client';
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useRef, useState } from 'react';

const paypalCaptureOrder = async (orderID: string) => {
  try {
    const response = await fetch('/api/payment/capture-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderID }), // Format the body as specified
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorData = await response.json();
      console.error('Error capturing PayPal order:', errorData);
      // Optionally, show an error toast
      // toast.error('Failed to capture order. Please try again.');
      return;
    }

    const data = await response.json();

    if (data.success) {
      // Order is successful
      console.log('Order captured successfully:', data);

      // Optionally, show a success toast
      // toast.success('Amount added to wallet');

      // And/Or update Redux Wallet Balance
      // dispatch(setWalletBalance({ balance: data.data.wallet.balance }));
    } else {
      console.error('Order capture failed:', data);
      // Optionally, show an error toast
      // toast.error('Failed to capture order.');
    }
  } catch (err) {
    // Handle network or other unexpected errors
    console.error('Error capturing PayPal order:', err);

    // Optionally, show an error toast
    // toast.error('Some error occurred. Please try again.');
  }
};

export default function ClientPage() {
  const initialOptions: ReactPayPalScriptOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
    currency: 'USD',
    intent: 'capture',
  };

  const posthog = usePostHog();
  const { createNewMigration } = useMigration();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();
  const defaultPrice = '50.00';
  const [price, setPrice] = useState(defaultPrice);
  const { getAllUserMigrations } = useMigration();
  const priceRef = useRef(price);

  const validateReviewToApplyDiscount = async () => {
    //get user id in ssssion
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error fetching session', sessionError);
      return null;
    }

    if (session.session?.user.id === undefined) {
      throw new Error('User ID is undefined');
    }
    setUserId(session.session?.user.id);

    const { data: feedback, error } = await supabase
      .from('feedback')
      .select('*')
      .eq('user_id', session.session?.user.id);

    if (error) {
      console.error('Error fetching feedback:', error);
    }
    const migrations = await getAllUserMigrations();
    if (migrations) {
      const fullMigrations = migrations.filter(
        (migration) => migration.type === 'full'
      );
      if (fullMigrations.length > 0) {
        return false;
      }
    }

    if (feedback && feedback.length > 0) {
      // User has already given feedback
      return true;
    }

    return false;
  };

  const paypalCreateOrder = async (userID: string) => {
    try {
      const response = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userID,
          order_price: priceRef.current,
        }),
      });

      if (!response.ok) {
        // Handle HTTP errors
        const errorData = await response.json();
        console.error('Error creating PayPal order:', errorData);
        // Optionally show a toast or alert
        // toast.error('Failed to create order. Please try again.');
        return null;
      }

      const data = await response.json();
      return data.data.response.result.id; // Assuming the API returns the order ID at this key
    } catch (err) {
      console.error('Network or other error occurred:', err);
      // Optionally show a toast or alert
      // toast.error('An error occurred. Please try again.');
      return null;
    }
  };

  useEffect(() => {
    const checkFeedback = async () => {
      validateReviewToApplyDiscount().then((hasFeedback) => {
        if (hasFeedback) {
          setPrice('10.00');
          priceRef.current = price;
        }
      });
    };
    checkFeedback();
  }, [price]);

  const styles: PayPalButtonsComponentProps['style'] = {
    shape: 'rect',
    layout: 'vertical',
    color: 'silver',
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-6 grid grid-cols-12 gap-4 w-full max-w-4xl">
        {/* Service Details Section */}
        <div className="col-span-12 md:col-span-7 border-r border-gray-300 pr-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Service Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Service Name:</span>
              <span className="font-medium text-gray-800">
                Full Migration Service
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Price:</span>
              <span className="font-medium text-gray-800">${price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Description:</span>
              <span className="text-gray-700">Complete data migration </span>
            </div>
            {/* <div className="mt-6">
                            <img
                                src="/images/service-placeholder.jpg"
                                alt="Service preview"
                                className="rounded-lg shadow-md w-full h-48 object-cover"
                            />
                        </div> */}
          </div>
        </div>

        {/* PayPal Section */}
        <div className="col-span-12 md:col-span-5 flex flex-col justify-between">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Payment</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <PayPalScriptProvider options={initialOptions}>
              <PayPalButtons
                style={styles}
                createOrder={async (data, actions) => {
                  posthog.capture('paypal_payment_started');
                  console.log('price', price);
                  const order_id = await paypalCreateOrder(userId || '123');
                  return order_id + '';
                }}
                onApprove={async (data, actions) => {
                  posthog.capture('paypal_payment_approved');
                  createNewMigration('full');
                  router.push(`/migrate/`);
                  const response = await paypalCaptureOrder(data.orderID);
                  return;
                }}
                onCancel={(data) => {
                  posthog.capture('paypal_payment_cancelled');
                }}
                onClick={(data, actions) => {
                  posthog.capture('paypal_button_clicked');
                }}
              />
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ClientPage };
