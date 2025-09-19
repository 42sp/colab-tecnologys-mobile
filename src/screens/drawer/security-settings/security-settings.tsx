import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SecuritySettingsForm } from './security-settings-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function SecuritySettingsScreen() {
	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<SafeAreaView className="bg-[#F9FAFB]" edges={['bottom']}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<SecuritySettingsForm />
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}
