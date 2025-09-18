import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ResetPasswordForm } from './reset-password-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function ResetPasswordScreen() {
	return (
		<SafeAreaView>
			<KeyboardAvoidingView behavior={'height'}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<ResetPasswordForm />
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
