import { useEffect, useState } from 'react'
import OTPTextView from 'react-native-otp-textinput'
import { Text, View, TouchableOpacity, Image, Modal, ActivityIndicator } from 'react-native'
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
import { ErrorModal } from '@/components/ui/error-modal'

const otpSchema = z.object({
	otp: z
		.string()
		.length(6, 'O código deve ter 6 dígitos')
		.regex(/^\d{6}$/, 'Apenas números'),
})

type otpForm = z.infer<typeof otpSchema>

export default function VerifyCode() {
	const { stack } = useNavigate()
	const [baseTimer, setBaseTimer] = useState(30)
	const cpf = useSelector((state: RootState) => state.passwordRecovery.cpf)
	// const phone = useSelector((state: RootState) => state.passwordRecovery.phone) // está faltando como response no back
	const dispatch = useDispatch()
	const [modalVisible, setModalVisible] = useState(false)
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
		console.log('otp data: ', data)
		try {
			const response = await passwordRecovery({ cpf, code: data.otp })
			console.log('response', response)

			dispatch(
				setAuth({
					token: response.accessToken ?? null,
					expiry: '',
					id: '',
				}),
			)
			stack('resetPassword')
		} catch (error) {
			console.log(error)
			setModalVisible(true)
			stack('resetPassword')
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
		<SafeAreaView>
			<View className="mx-4 rounded-lg bg-white p-10">
				<View className="my-4 px-4">
					<Image
						source={require('@/assets/fingerprint-icon.png')}
						className="h-20 w-20 self-center"
						resizeMode="contain"
					/>
					<Text className="mt-4 text-center text-2xl font-bold">Verificação de Código</Text>
					<Text className="text-md mt-4 text-center font-inter text-gray-500">
						Digite o código de 6 digitos enviado para
					</Text>
					<View className="mt-2 flex-row items-center justify-center gap-2">
						<Text className="text-center font-inter-bold text-xl text-gray-500">
							(xx) xxxx-7890
						</Text>
						<FontAwesome name="whatsapp" size={24} color="#25D366" />
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

				<Text className="mt-4 text-center font-inter font-bold text-blue-400">
					Aguarde {formatTimer(timer)} para enviar novamente
				</Text>

				<TouchableOpacity
					className="mt-6 self-center font-inter"
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
					<Text className="text-center font-inter-bold text-base leading-6 text-blue-400">
						Reenviar código
					</Text>
				</TouchableOpacity>
				<ErrorModal
					visible={modalVisible}
					message="Código incorreto"
					description="Tente novamente."
					onClose={() => setModalVisible(false)}
				/>
				<Modal transparent={true} animationType="none" visible={isSubmitting}>
					<View className="flex-1 items-center justify-center">
						<ActivityIndicator size={52} color="#FF6700" />
					</View>
				</Modal>
			</View>
		</SafeAreaView>
	)
}
