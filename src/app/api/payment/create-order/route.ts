import paypal from '@paypal/checkout-server-sdk';
import { NextResponse } from 'next/server';
import client from '../../../../utils/paypal/serverClient';

export async function POST(req) {
  const body = await req.json();

  if (!body.order_price || !body.user_id) {
    return NextResponse.json({
      success: false,
      message: 'Please Provide order_price And User ID',
    });
  }

  try {
    const PaypalClient = client();
    //This code is lifted from https://github.com/paypal/Checkout-NodeJS-SDK
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers['prefer'] = 'return=representation';
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: body.order_price,
          },
        },
      ],
    });
    const response = await PaypalClient.execute(request);
    if (response.statusCode !== 201) {
      console.log('RES: ', response);
      return NextResponse.json(
        {
          success: false,
          data: { response },
          message: 'Some Error Occured at backend',
        },
        { status: 500 }
      );
    }

    // Your Custom Code for doing something with order
    // Usually Store an order in the database like MongoDB
    // return NextResponse.json({ message: 'Hello World' }, { status: 200 });

    return NextResponse.json(
      { success: true, data: { response } },
      { status: response.statusCode }
    );
  } catch (err) {
    console.log('Err at Create Order: ', err);
    return NextResponse.json(
      { success: false, message: 'Could Not Found the user' },
      { status: 500 }
    );
  }
}
