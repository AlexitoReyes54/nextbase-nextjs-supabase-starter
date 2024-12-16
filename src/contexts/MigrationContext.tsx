'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

export type migrationType = 'demo' | 'full' | undefined;

// Define the shape of the context value
type MigrationContextType = {
  migrationType: migrationType;
  setMigrationType: React.Dispatch<React.SetStateAction<migrationType>>;
};

// Create the context
const MigrationContext = createContext<MigrationContextType | undefined>(
  undefined
);

// Create the provider component
export const MigrationProvider = ({ children }: { children: ReactNode }) => {
  const [migrationType, setMigrationType] = useState<migrationType>(undefined);

  // Load migrationType from sessionStorage on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = sessionStorage.getItem('migrationType');
      setMigrationType(
        storedValue ? (storedValue as migrationType) : undefined
      );
    }
  }, []);

  // Update sessionStorage whenever migrationType changes
  useEffect(() => {
    if (typeof window !== 'undefined' && migrationType !== undefined) {
      sessionStorage.setItem('migrationType', migrationType);
    }
  }, [migrationType]);

  return (
    <MigrationContext.Provider value={{ migrationType, setMigrationType }}>
      {children}
    </MigrationContext.Provider>
  );
};

// Custom hook to use the MigrationContext
export const useMigrationContext = (): MigrationContextType => {
  const context = useContext(MigrationContext);
  if (!context) {
    throw new Error(
      'useMigrationContext must be used within a MigrationProvider'
    );
  }
  return context;
};
