import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function SettingsScreen() {
	const navigation = useNavigation()

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Settings Screen</Text>
			<Button title="Go Back" onPress={() => navigation.goBack()} />
		</View>
	)
}
