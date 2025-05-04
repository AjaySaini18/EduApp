import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext'; 

interface SubscriptionContextType {
  isSubscribed: boolean;
  setSubscribed: (status: boolean) => Promise<void>;
  loading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  isSubscribed: false,
  setSubscribed: async () => {},
  loading: true,
});

export const useSubscription = () => useContext(SubscriptionContext);

export const SubscriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      if (user) {
        setIsSubscribed(user.isSubscribed);
      }
      setLoading(false);
    };

    checkSubscription();
  }, [user]);

  const setSubscribed = async (status: boolean) => {
    try {
      // Update in your backend first
      // await api.updateSubscriptionStatus(user?.id, status);
      
      // Then update local state and storage
      setIsSubscribed(status);
      await AsyncStorage.setItem('subscriptionStatus', JSON.stringify(status));
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  };

  return (
    <SubscriptionContext.Provider value={{ isSubscribed, setSubscribed, loading }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionProvider;