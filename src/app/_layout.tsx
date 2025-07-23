import { Stack } from 'expo-router';
import '@/global.css';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" options={{}} />
      <Stack.Screen name="sign-in" options={{}} />
      {/* <Stack.Screen name="register" options={{}} />
      <Stack.Screen name="login" options={{}} /> */}
    </Stack>
  );
}
