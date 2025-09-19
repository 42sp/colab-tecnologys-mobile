import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { SignUpForm } from './sign-up-form'

export default function SignUpScreen() {
	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<SafeAreaView className="bg-white px-10">
				<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
					<SignUpForm />
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}
