'use client';
import { createClient } from '@/supabase-clients/client';

export function useMigration() {
  const supabase = createClient();

  const getAllUserMigrations = async () => {
    try {
      const { data: session, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        console.error('Error fetching session', sessionError);
        return null;
      }

      if (session.session?.user.id === undefined) {
        throw new Error('User ID is undefined');
      }
      const { data: migrations, error } = await supabase
        .from('migration')
        .select(`*`)
        .eq('ownerID', session.session?.user.id);

      if (error) {
        console.error('Error fetching migrations', error);
        return null;
      }

      return migrations;
    } catch (error) {
      console.error('Unexpected error fetching migrations:', error);
      return null;
    }
  };

  const validateDemoMigrationExists = async (): Promise<boolean> => {
    const migrations = await getAllUserMigrations();
    if (!migrations) {
      return false;
    }

    return migrations.some((migration) => migration.type === 'demo');
  };

  const getUserFullMigrationsPending = async () => {
    const migrations = await getAllUserMigrations();
    if (!migrations) {
      return null;
    }

    return migrations.find(
      (migration) => migration.type === 'full' && migration.status === 'pending'
    );
  };

  const createNewMigration = async (type: string): Promise<boolean> => {
    try {
      const { data: session, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        console.error('Error fetching session', sessionError);
        return false;
      }

      if (session.session?.user.id === undefined) {
        throw new Error('User ID is undefined');
      }

      const { error } = await supabase.from('migration').insert([
        {
          ownerID: session.session?.user.id,
          type,
          status: 'pending',
        },
      ]);

      if (error) {
        console.error('Error creating migration:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Unexpected error creating migration:', error);
      return false;
    }
  };

  const updateMigrationStatus = async (
    migrationID: string,
    status: string
  ): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('migration')
        .update({ status })
        .eq('id', migrationID);

      if (error) {
        console.error('Error updating migration status:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Unexpected error updating migration status:', error);
      return false;
    }
  };

  return {
    getAllUserMigrations,
    validateDemoMigrationExists,
    getUserFullMigrationsPending,
    createNewMigration,
    updateMigrationStatus,
  };
}
