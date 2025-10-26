import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LogModal } from '@/components/ui/log-modal'
import { Image, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useNavigate } from '@/libs/react-navigation/useNavigate'
import { passwordRecovery } from '@/api/password-recovery'
import { useDispatch } from 'react-redux'
import { setPasswordRecovery } from '@/libs/redux/password-recovery/password-recovery-slice'
import { LoadingModal } from '@/components/ui/loading-modal'
import { mask, unMask } from 'react-native-mask-text'

const forgotPasswordSchema = z.object({
	cpf: z.string().nonempty('CPF é obrigatório').length(11, 'CPF deve ser válido'),
})

type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordScreen() {
	const navigate = useNavigate()
	const { goBack } = useNavigate().navigation
	const dispatch = useDispatch()
	const [modal, setModal] = useState<{
		visible: boolean
		description: string
	}>({
		visible: false,
		description: '',
	})

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordType>({
		resolver: zodResolver(forgotPasswordSchema),
		defaultValues: {
			cpf: '',
		},
	})

	async function onSubmit({ cpf }: ForgotPasswordType) {
		try {
			navigate.stack('verifyCode', { flux: 'forgot-password', cpf })
		} catch (error) {
			console.log(error)
			setModal({
				visible: true,
				description: 'CPF incorreto. Tente novamente.',
			})
		}
	}

	return (
		<SafeAreaView className="h-full bg-white">
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="p-10">
						<Image source={require('@/assets/alvenatech.png')} className="mb-5 self-center" />
						<View className="my-5 items-center">
							<Text className="font-inter-bold text-3xl">Esqueci minha senha</Text>
							<Text className="mt-2 text-center font-inter text-lg text-neutral-500">
								Informe seu CPF para receber uma nova senha
							</Text>
						</View>

						<View className="mt-10">
							<Controller
								control={control}
								name="cpf"
								render={({ field: { onChange, onBlur, value } }) => (
									<View>
										<Input
											keyboardType="numeric"
											autoCapitalize="none"
											IconLeft="mail"
											placeholder="Informe seu CPF"
											onBlur={onBlur}
											value={mask(value || '', '999.999.999-99')}
											onChangeText={(text) => onChange(unMask(text).slice(0, 11))}
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
								Enviaremos uma mensagem ao seu celular com um código de ativação
							</Text>

							<Button
								className="mt-8"
								title="Resetar a senha"
								onPress={handleSubmit(onSubmit)}
								disabled={isSubmitting}
							/>

							<TouchableOpacity
								className="mt-6 self-center"
								activeOpacity={0.5}
								onPress={() => goBack()}
							>
								<Text className="text-center font-inter-bold text-base leading-6 text-blue-600">
									Voltar para o Login
								</Text>
							</TouchableOpacity>
						</View>
						<LoadingModal visible={isSubmitting} />
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
