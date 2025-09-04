import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { SignUpForm } from './sign-up-form'
import { createProfile } from '@/api/create-profile'
import { createUser } from '@/api/create-user'
import { signIn } from '@/api/sign-in'
import { useDispatch } from 'react-redux'

export default function SignUpScreen() {
	return (
		<SafeAreaView className="bg-white px-10">
			<KeyboardAvoidingView behavior={'height'}>
				<ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
					<SignUpForm />
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
