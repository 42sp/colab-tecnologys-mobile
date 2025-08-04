import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { SecuritySettingsForm } from '@/components/security-settings/security-settings-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function Home() {
	return (
		<SafeAreaProvider>
			<SafeAreaView>
				<KeyboardAvoidingView behavior={'height'}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<SecuritySettingsForm />
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
