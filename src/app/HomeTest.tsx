import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackParamList } from './stack-layout'

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, 'home'>

export default function HomeScreen() {
	const navigation = useNavigation<HomeScreenNavigationProp>()

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home Screen</Text>
			<Button title="Go to Settings" onPress={() => navigation.navigate('settings')} />
		</View>
	)
}
