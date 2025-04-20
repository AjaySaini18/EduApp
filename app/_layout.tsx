import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack initialRouteName="LoadingScreen" screenOptions={{ headerShown: false }} />;
}
