import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView>
      <Text className="flex self-center text-xl">Home Screen</Text>
    </SafeAreaView>
  );
}
