import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ResetPasswordForm } from './reset-password-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function ResetPasswordScreen({ route }: any) {
	return (
		<SafeAreaView edges={[]}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<ResetPasswordForm route={route} />
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
