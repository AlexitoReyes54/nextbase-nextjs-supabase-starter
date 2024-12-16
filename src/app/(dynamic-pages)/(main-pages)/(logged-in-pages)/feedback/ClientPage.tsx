'use client';
import { Alert } from '@/components/ui/alert';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { T } from '@/components/ui/Typography';
import { createClient } from '@/supabase-clients/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function ClientPage() {
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('asd asda asdas asasdad');
  const supabase = createClient();
  const router = useRouter();
  const [feedbackSent, setFeedbackSent] = useState(false);

  const uploadReview = async () => {
    const { data: session, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error fetching session', sessionError);
      return null;
    }

    if (session.session?.user.id === undefined) {
      throw new Error('User ID is undefined');
    }

    const { data, error } = await supabase.from('feedback').insert([
      {
        user_id: session.session?.user.id,
        review,
      },
    ]);

    if (error) {
      console.error('Error inserting review', error);
      return null;
    }

    setFeedbackSent(true);
    return data;
  };

  const handleSubmit = () => {
    if (review.trim()) {
      setMessage('Thank you for your feedback!');
      uploadReview();
      setReview(''); // Clear the text area after submission
    } else if (review.trim().length < 30) {
      setMessage('Review must be at least 30 characters long');
    } else {
      setMessage('Please write a review before submitting!');
    }
  };

  return (
    <div className="flex flex-col h-screen ">
      {/* Page Title */}

      <T.H2 className="">Feedback</T.H2>

      {/* offer alert */}
      <Alert>
        <T.Large>Get a a special deal for our lunch 🎉</T.Large>
        <T.P className="text-sm">
          In exchange for your feedback<b> pay 10$ instead of 50$ </b>
          the discount will be applied automatically
        </T.P>
      </Alert>

      {/* Page Content */}
      <div className="mt-2">
        <textarea
          className="w-full h-[calc(100vh-300px)] resize-none p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500
                    bg-white shadow-md"
          placeholder="Share your thoughts about our service..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>

      {/* Submit Button */}
      {/* Alert dialog */}
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex justify-end ">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Feedback</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                if (feedbackSent) {
                  router.push('/dashboard');
                }
              }}
            >
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ClientPage;
