import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';

import './global.css';
import { GluestackUIProvider } from '@/ui/gluestack-ui-provider';
import { ExampleGluestack } from '@/ExampleGluestack';

export default function App() {
  return (
    <>
      <GluestackUIProvider>
        <ScreenContent title="Home" path="App.tsx"></ScreenContent>
        <ExampleGluestack />
        <StatusBar style="auto" />
      </GluestackUIProvider>
    </>
  );
}
