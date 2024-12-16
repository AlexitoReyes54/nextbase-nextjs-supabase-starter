'use client';

import { Button } from '@/components/Button';
import { T } from '@/components/ui/Typography';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';

import React from 'react';
import Confetti from 'react-confetti';

export const ClientPage: React.FC = () => {
  const router = useRouter();
  const posthog = usePostHog();

  React.useEffect(() => {
    posthog.capture('migration_complete');
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: -100 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center h-screen"
    >
      <div
        id="tsparticles"
        style={{ position: 'relative', top: '-100px' }}
        className="flex justify-center items-center flex-col gap-4"
      >
        <T.H1>Migration Complete</T.H1>
        <Button onClick={() => router.push('/dashboard')}>
          Go to dashboard
        </Button>
      </div>
      <Confetti width={window.innerWidth} height={window.innerHeight} />
    </motion.div>
  );
};
