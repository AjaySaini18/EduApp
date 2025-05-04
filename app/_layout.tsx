import { Slot } from 'expo-router';
import { AuthProvider } from './context/AuthContext';
import SubscriptionProvider from './context/SubscriptionContext';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SubscriptionProvider>
        <Slot />
      </SubscriptionProvider>
    </AuthProvider>
  );
}