import { Image, KeyboardAvoidingView, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { SignInDivisor } from '@/components/sign-in/sign-in-divisor'
import { Button } from '@/components/ui/button'
import { SignInForm } from '@/components/sign-in/sign-in-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function SignInScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView className="h-full bg-white p-10">
				<KeyboardAvoidingView behavior={'height'}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Image source={require('@/assets/tecnologys-logo.png')} className="mb-5 self-center" />

						<View className="my-5 items-center">
							<Text className="font-inter-bold text-3xl">Welcome Back</Text>
							<Text className="mt-2 text-center font-inter text-lg text-neutral-500">
								Sign in to continue
							</Text>
						</View>

						<Button
							title="Continue with Google"
							onPress={() => {}}
							variant="outline"
							className="my-5 self-center"
						>
							<Image source={require('@/assets/google-logo.png')} className="mr-2" />
						</Button>

						<SignInDivisor text="or" className="my-5" />

						<SignInForm />
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
