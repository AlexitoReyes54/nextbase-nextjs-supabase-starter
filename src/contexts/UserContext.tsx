'use client';

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

// Define the shape of the context value
type UserContextType = {
  userId: string | undefined;
  setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  // Load userId from sessionStorage on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = sessionStorage.getItem('userId');
      setUserId(storedValue || undefined);
    }
  }, []);

  // Update sessionStorage whenever userId changes
  useEffect(() => {
    if (typeof window !== 'undefined' && userId !== undefined) {
      sessionStorage.setItem('userId', userId);
    }
  }, [userId]);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
