import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SecuritySettingsForm } from './security-settings-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function SecuritySettingsScreen() {
	return (
		<SafeAreaView>
			<KeyboardAvoidingView behavior={'height'}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<SecuritySettingsForm />
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
