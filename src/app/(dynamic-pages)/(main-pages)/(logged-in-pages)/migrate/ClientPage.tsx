'use client';

import { motion } from 'framer-motion';

import { T } from '@/components/ui/Typography';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMigration } from '@/hooks/useMigration';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useMigrationContext } from '../../../../../contexts/MigrationContext';

export const ClientPage: React.FC = () => {
  const { migrationType } = useMigrationContext();
  const router = useRouter();
  const {
    validateDemoMigrationExists,
    getUserFullMigrationsPending,
    createNewMigration,
    updateMigrationStatus,
  } = useMigration();
  const demoMigrationExist: Promise<boolean> = validateDemoMigrationExists();
  const [alreadyHaveDemoMigration, setAlreadyHaveDemoMigration] =
    useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMigrating, setIsMigrating] = useState<boolean>(false);
  const posthog = usePostHog();
  const [migrationData, setMigrationData] = useState<{
    id: string;
    status: string;
    user_id: string;
    migration_type: string;
  }>();

  const initalPageValidation = () => {
    if (migrationType === 'demo') {
      demoMigrationExist
        .then((exist: boolean) => {
          setLoading(true);
          setAlreadyHaveDemoMigration(exist);
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (migrationType === 'full') {
      getUserFullMigrationsPending()
        .then((migration) => {
          setLoading(true);
          if (!migration) {
            router.push('/dashboard');
            toast.error('You do not have any pending migration');
          } else {
            setMigrationData(migration);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      router.push('/dashboard');
    }
  };

  useEffect(() => {
    initalPageValidation();
  }, []);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 0, y: 100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-screen"
      >
        <span
          className="loading loading-spinner loading-lg"
          style={{ position: 'relative', top: '-100px' }}
        ></span>
      </motion.div>
    );
  }

  if (alreadyHaveDemoMigration) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 0, y: -100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-screen"
        onLoad={() => {
          posthog.capture('demo_migration_already_exist', {
            migration_type: migrationType,
          });
        }}
      >
        <div
          style={{ position: 'relative', top: '-100px' }}
          className="flex justify-center items-center flex-col gap-4"
        >
          <T.H1>You already had a demo migration</T.H1>
          <Button onClick={() => router.push('/dashboard')}>Go Back</Button>
        </div>
      </motion.div>
    );
  }

  if (isMigrating) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 0, y: -100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center items-center h-screen"
      >
        <div
          style={{ position: 'relative', top: '-100px' }}
          className="flex justify-center items-center flex-col gap-4"
        >
          <T.H1>Migration in progress</T.H1>
          <span className="loading loading-bars loading-lg"></span>
          <Button
            onClick={() => {
              router.push('/migrate/complete');
            }}
          >
            DONE
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <T.H1>Run your migration {migrationType} </T.H1>
      <br />
      <div className="flex w-full gap-4 justify-center items-center">
        {content()}
      </div>
      <motion.div
        initial={{ opacity: 0, x: 0, y: 100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-end items-end mt-8 gap-4"
      >
        <Button
          onClick={() => {
            posthog.capture('migration_initiated', {
              migration_type: migrationType,
            });

            // add form validation here

            if (migrationType === 'demo') {
              createNewMigration(migrationType as string);
            } else if (migrationType === 'full' && migrationData) {
              updateMigrationStatus(migrationData.id, 'initiated');
            }
            setIsMigrating(true);
          }}
        >
          Initiate Migration
        </Button>
        <Button
          variant={'secondary'}
          onClick={() => {
            posthog.capture('migration_later', {
              migration_type: migrationType,
            });
            router.push('/dashboard');
          }}
        >
          {' '}
          Migrate later
        </Button>
      </motion.div>
    </>
  );
};

const content = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2"
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle>WOOCOMERCE CREDENTIALS</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label className="text-black font-bold" htmlFor="store_url">
                  Woocomerce store url
                </Label>
                <Input
                  placeholder="https://example.com"
                  type="text"
                  id="store-url"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-black font-bold" htmlFor="api-key">
                  Woocomerce Consumer Key
                </Label>
                <Input placeholder="" type="text" id="api-key" />
                <T.Small className="mt-10">
                  Si no sabes como obtern haga click en el link
                </T.Small>
              </div>
              <div className="space-y-2">
                <Label className="text-black font-bold" htmlFor="api-secret">
                  Woocomerce Consumer Secret
                </Label>
                <Input placeholder="c" type="text" id="api-secret" />
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-1/2"
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle>SHOPIFY CREDENTIAL</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-black font-bold" htmlFor="store_url">
                    Shopify store url
                  </Label>
                  <Input
                    placeholder="https://example.com"
                    type="text"
                    id="store-url"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-black font-bold" htmlFor="api-key">
                    Shopify API Key
                  </Label>
                  <Input placeholder="0" type="text" id="api-key" />
                  <T.Small className="mt-10">
                    Si no sabes como obtern haga click en el link
                  </T.Small>
                </div>
                <div className="space-y-2">
                  <Label className="text-black font-bold" htmlFor="api-secret">
                    Shopify Access Token
                  </Label>
                  <Input placeholder="ss" type="text" id="api-secret" />
                </div>
              </form>
            </CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};
// klk
