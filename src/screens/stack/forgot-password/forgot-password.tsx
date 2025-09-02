import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Image, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigation } from '@react-navigation/native'

const forgotPasswordSchema = z.object({
	cpf: z.string().nonempty('O cpf é necessário'),
})

type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordScreen() {
	const router = useNavigation()

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordType>({
		resolver: zodResolver(forgotPasswordSchema),
	})

	async function onSubmit(data: ForgotPasswordType) {
		console.log('Email', JSON.stringify(data))
		await new Promise((resolve) => setTimeout(resolve, 1000))
	}

	return (
		<SafeAreaView className="h-full bg-white p-10">
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Image source={require('@/assets/tecnologys-logo.png')} className="mb-5 self-center" />
					<View className="my-5 items-center">
						<Text className="font-inter-bold text-3xl">Esqueci a senha</Text>
						<Text className="mt-2 text-center font-inter text-lg text-neutral-500">
						Digite seu CPF para redefinir sua senha
						</Text>
					</View>

					<View className="mt-10">
						<Controller
							control={control}
							name="cpf"
							render={({ field: { onChange, onBlur, value } }) => (
								<View>
									<Input
										keyboardType="email-address"
										autoCapitalize="none"
										IconLeft="mail"
										placeholder="Cpf"
										onBlur={onBlur}
										onChangeText={onChange}
										value={value}
										hasError={!!errors.cpf}
									/>
									{errors.cpf && (
										<Text className="mt-1 font-inter text-sm text-red-500">
											{errors.cpf.message}
										</Text>
									)}
								</View>
							)}
						/>

						<Text className="mt-4 text-center font-inter text-sm leading-5 text-neutral-500">
						Enviaremos um link para redefinir sua senha.
						</Text>

						<Button
							className="mt-8"
							title="Redefinir senha"
							onPress={handleSubmit(onSubmit)}
							disabled={isSubmitting}
						/>

						<TouchableOpacity
							className="mt-6 self-center"
							activeOpacity={0.5}
							onPress={() => router.goBack()}
						>
							<Text className="text-center font-inter-bold text-base leading-6 text-blue-600">
							Voltar para o Login
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
