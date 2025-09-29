import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SecuritySettingsForm } from './security-settings-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function SecuritySettingsScreen({ route }: any) {
	return (
		<SafeAreaView edges={[]}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<SecuritySettingsForm />
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
