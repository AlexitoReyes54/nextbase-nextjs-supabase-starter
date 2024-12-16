'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

import { T } from '@/components/ui/Typography';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMigration } from '@/hooks/useMigration';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';
import {
  migrationType,
  useMigrationContext,
} from '../../../../../contexts/MigrationContext';

export const ClientPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const { getUserFullMigrationsPending } = useMigration();

  const migrationOptions: OptionCardProps[] = [
    {
      title: 'Demo migration',
      description:
        'Migrate a small subset of data to test the smoothness of the tool before migrating all data...not like the others...',
      cta: "Ok, let's try",
      type: 'demo',
    },
    {
      title: 'Full migration',
      description:
        'Migrate all data from your current Woocomerce store to the new store',
      cta: "Let's do it",
      type: 'full',
    },
  ];

  useEffect(() => {
    getUserFullMigrationsPending().then((migration) => {
      if (migration) {
        setShowAlert(true);
      }
    });
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 0, y: 100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
        className="	p-4 mt-4"
      >
        {showAlert ? (
          <Alert>
            <AlertTitle>You have a pending Full Migration!</AlertTitle>
            <AlertDescription>
              This is just a friendly reminder pal
            </AlertDescription>
          </Alert>
        ) : (
          <Alert>
            <T.Large>Get a a special deal for our lunch 🎉</T.Large>
            <T.P className="text-sm">
              In exchange for your feedback<b> pay 10$ instead of 50$ </b>
              the discount will be applied automatically
            </T.P>
          </Alert>
        )}
      </motion.div>
      <div className="flex w-full justify-center items-center flex-wrap">
        {migrationOptions.map((option, index) => (
          <OptionCard
            key={index}
            title={option.title}
            description={option.description}
            cta={option.cta}
            type={option.type}
          />
        ))}
        <FeedbackButton />
      </div>
    </>
  );
};

const FeedbackButton = () => {
  const router = useRouter();

  const handleFeedbackClick = () => {
    router.push('/feedback'); // Redirect to the feedback page
  };

  return (
    <button
      onClick={handleFeedbackClick}
      className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-full shadow-lg transition-transform transform hover:scale-105"
      aria-label="Give Feedback"
    >
      📝 Feedback
    </button>
  );
};

interface OptionCardProps {
  title: string;
  description?: string;
  cta?: string;
  type: migrationType;
}

const OptionCard: React.FC<OptionCardProps> = ({
  title,
  description,
  cta,
  type,
}: OptionCardProps) => {
  const router = useRouter();
  const { setMigrationType } = useMigrationContext();
  const { getUserFullMigrationsPending } = useMigration();
  const posthog = usePostHog();

  const handleMigrationClick = async (type: migrationType) => {
    setMigrationType(type);

    if (type === 'demo') {
      posthog.capture('choose_migration_demo', { migration_type: 'demo' });
      router.push(`/migrate/`);
      return;
    }

    if (type === 'full') {
      posthog.capture('choose_migration_full', { migration_type: 'full' });
      const migration = await getUserFullMigrationsPending();
      router.push(migration ? `/migrate/` : `/payment/`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 100 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5 }}
      className="	p-4 mt-4"
    >
      <Card className="w-50 max-w-md mx-auto">
        <CardHeader>
          <CardTitle>
            <T.H2>{title}</T.H2>
          </CardTitle>
          <T.Subtle>{description ?? 'Description'}</T.Subtle>
        </CardHeader>
        <CardContent>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              className="w-full"
              variant="default"
              onClick={() => handleMigrationClick(type)}
            >
              {cta ?? 'Enter'}
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
