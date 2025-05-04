import { Slot, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Wait until layout has mounted
      setTimeout(() => {
        router.replace('/login');
      }, 0);
    }
  }, [loading, user]);

  // While auth is loading OR redirecting, don't render anything
  if (loading || (!loading && !user)) {
    return <LoadingScreen />;
  }

  return <Slot />;
};

export default Layout;
