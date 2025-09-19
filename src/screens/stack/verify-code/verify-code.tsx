import { useEffect, useState } from 'react'
import OTPTextView from 'react-native-otp-textinput'
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { setAuth } from '@/libs/redux/auth/auth-slice'
import { passwordRecovery } from '@/api/password-recovery'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesome } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@/libs/react-navigation/useNavigate'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
// import Clipboard from 'expo-clipboard';
import { zodResolver } from '@hookform/resolvers/zod'
import { RootState } from '@/libs/redux/store'
import { LogModal } from '@/components/ui/log-modal'
import { LoadingModal } from '@/components/ui/loading-modal'
import { ScrollView } from 'react-native-gesture-handler'
import Card from '@/components/ui/card'
import { updatePasswordRecovery } from '@/libs/redux/password-recovery/password-recovery-slice'

const otpSchema = z.object({
	otp: z
		.string()
		.length(6, 'O código deve ter 6 dígitos')
		.regex(/^\d{6}$/, 'Apenas números'),
})

type otpForm = z.infer<typeof otpSchema>

export default function VerifyCode() {
	const { stack } = useNavigate()
	const dispatch = useDispatch()
	const [baseTimer, setBaseTimer] = useState(30)
	const { phone, cpf } = useSelector((state: RootState) => state.passwordRecovery)
	const lastFourDigits = phone?.slice(-4)

	const [modal, setModal] = useState<{
		visible: boolean
		description: string
	}>({
		visible: false,
		description: '',
	})
	const [timer, setTimer] = useState(30)
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<otpForm>({
		resolver: zodResolver(otpSchema),
		defaultValues: {
			otp: '',
		},
	})

	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1)
			}, 1000)

			return () => clearInterval(interval)
		} else {
			setIsButtonDisabled(false)
		}
	}, [timer])

	async function onSubmit(data: otpForm) {
		try {
			const response = await passwordRecovery({ cpf, code: data.otp })
			console.log('response', response)

			dispatch(
				updatePasswordRecovery({
					accessToken: response.accessToken,
					exp: response.exp,
				}),
			)

			stack('resetPassword')
		} catch (error) {
			console.log(error)
			setModal({
				visible: true,
				description: 'Código inválido. Tente novamente.',
			})
		}
	}

	// const handleCellTextChange = async (text: string, i: number) => {
	// 	if (i === 0) {
	// 	  const clippedText = await Clipboard.getStringAsync();
	// 	  if (clippedText.slice(0, 1) === text) {
	// 		input.current?.setValue(clippedText, true);
	// 	  }
	// 	}
	//   };

	function formatTimer(seconds: number): string {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60

		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
	}

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<SafeAreaView className="mb-10 bg-[#F9FAFB]" edges={['bottom']}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<Card className="m-5">
						<View className="items-center gap-4 p-4">
							<Image
								source={require('@/assets/fingerprint-icon.png')}
								className="h-20 w-20 self-center"
								resizeMode="contain"
							/>
							<Text className="mt-4 font-inter-bold text-2xl">Verificação de Código</Text>
							<View>
								<Text className="text-md mt-4 font-inter text-gray-500">
									Digite o código de 6 digitos enviado para
								</Text>
								<View className="mt-2 flex-row justify-center gap-2">
									<Text className="font-inter-bold text-xl text-gray-500">
										(xx) xxxx-${lastFourDigits}
									</Text>
									<FontAwesome name="whatsapp" size={24} color="#25D366" />
								</View>
							</View>
						</View>

						<View className="my-6 flex-row justify-center gap-2 ">
							<Controller
								name="otp"
								control={control}
								render={({ field: { onChange } }) => (
									<View>
										<OTPTextView
											handleTextChange={onChange}
											// handleCellTextChange={handleCellTextChange}
											inputCount={6}
											keyboardType="numeric"
											tintColor={'#d16a32'}
											textInputStyle={{
												borderWidth: 1,
												borderColor: '#ccc',
												borderRadius: 8,
												width: 42,
												height: 52,
												backgroundColor: '#fff',
											}}
										/>
									</View>
								)}
							/>
						</View>

						{errors.otp && (
							<Text className="pb-2 text-center font-inter text-red-500">{errors.otp.message}</Text>
						)}

						<Button title="Verificar" onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />

						<View className=" items-center gap-4 p-4">
							<Text className=" font-inter font-bold text-blue-400">
								Aguarde {formatTimer(timer)} para enviar novamente
							</Text>

							<TouchableOpacity
								activeOpacity={0.5}
								onPress={() => {
									console.log('Reenviar código')
									const newBase = baseTimer * 2
									setBaseTimer(newBase)
									setTimer(newBase)
									setIsButtonDisabled(true)
								}}
								disabled={isButtonDisabled}
							>
								<Text className="font-inter-bold text-blue-400">Reenviar código</Text>
							</TouchableOpacity>
						</View>
						<LogModal
							visible={modal.visible}
							description={modal.description}
							onClose={() => setModal({ visible: false, description: '' })}
						/>
						<LoadingModal visible={isSubmitting} />
					</Card>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}
