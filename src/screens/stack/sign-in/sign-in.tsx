import { Image, KeyboardAvoidingView, Platform, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SignInDivisor } from './sign-in-divisor'
import { Button } from '@/components/ui/button'
import { SignInForm } from './sign-in-form'
import { ScrollView } from 'react-native-gesture-handler'
import { LogModal } from '@/components/ui/log-modal'
import { useState } from 'react'

export default function SignInScreen() {
	const [modal, setModal] = useState<{
		visible: boolean
		//status: 'success' | 'error'
		description: string
	}>({
		visible: false,
		//status: 'error',
		description: '',
	})

	function handleGoogle() {
		// try {

		// } catch(error) {

		setModal({
			visible: true,
			//status: 'error',
			description: 'Não foi possível entrar com o Google. Tente novamente mais tarde.',
		})
		// }
	}

	return (
		<SafeAreaView className="h-full bg-white">
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={{ backgroundColor: 'white' }}
			>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="p-10">
						<Image source={require('@/assets/tecnologys-logo.png')} className="mb-5 self-center" />

						<View className="my-5 items-center">
							<Text className="font-inter-bold text-3xl">Bem vindo ao SEGY</Text>
							<Text className="mt-2 text-center font-inter text-lg text-neutral-500">
								Faça login para continuar
							</Text>
						</View>

						<Button
							title="Entrar com o Google"
							onPress={handleGoogle}
							variant="outline"
							className="my-5 self-center"
						>
							<Image source={require('@/assets/google-logo.png')} className="mr-2" />
						</Button>

						<SignInDivisor text="ou" className="my-5" />

						<SignInForm />
						<LogModal
							visible={modal.visible}
							description={modal.description}
							onClose={() => setModal({ visible: false, description: '' })}
						/>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
