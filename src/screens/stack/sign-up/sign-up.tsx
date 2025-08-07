import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { SignUpForm } from './sign-up-form'

export default function SignUpScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView className="bg-white px-10">
				<KeyboardAvoidingView behavior={'height'}>
					<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
						<SignUpForm />
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
