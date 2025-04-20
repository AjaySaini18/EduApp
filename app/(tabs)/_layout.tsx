import { Slot } from 'expo-router';
import React, { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen';

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <Slot />;
};

export default Layout;
