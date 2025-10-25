import { useEffect, useState } from 'react'
import OTPTextView from 'react-native-otp-textinput'
import { Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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
import { match, P } from 'ts-pattern'
import { updatePasswordRecovery } from '@/libs/redux/password-recovery/password-recovery-slice'
import { is } from 'zod/v4/locales'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { getCurrentDate } from '@/utils'

const otpSchema = z.object({
	otp: z
		.string()
		.length(6, 'O código deve ter 6 dígitos')
		.regex(/^\d{6}$/, 'Apenas números'),
})

type otpForm = z.infer<typeof otpSchema>

export default function VerifyCode({ route }: any) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [baseTimer, setBaseTimer] = useState(30)
	const [response, setResponse] = useState<{
		code: string
		expiration: string
		id: string
		phone: string
	}>({
		code: '',
		expiration: '',
		id: '',
		phone: '',
	})
	const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
	const { cpf, flux, phone } = route.params

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
		//const s = `${new Date(new Date().getTime() + 10 * 60000).toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }).replace(' ', 'T') + '.' + String(new Date().getMilliseconds()).padStart(3, '0')}`

		const expirationDate = response?.expiration
		const currentDate = new Date(getCurrentDate())

		console.log('expirationDate', expirationDate, currentDate)

		const isValid = verifyCode(code)
		console.log(
			'code',
			code.join('').length,
			//new Date(new Date(expirationDate) - currentDate).getMinutes(),
		)
	}, [response, code])

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

	useEffect(() => {
		sendCode()
	}, [])

	useEffect(() => {
		console.log('response no verify-code: ', response)
		if (response)
		{
			const { code } = response;
			setCode([
				code[0],
				code[1],
				code[2],
				code[4],
				code[5],
				code[6],
			]);
		}
	}, [response])

	const verifyCode = (enteredCode: string[]) => {
		const expiration = response.expiration
		const comparisson = response.code
		match({ enteredCode, expiration, comparisson })
			.with(
				{
					expiration: P.when((e) => {
						if (!e) return false
						const expirationDate = new Date(e)
						console.log('expirationDate', expirationDate)
						return new Date(getCurrentDate()).getTime() > expirationDate.getTime()
					}),
				},
				(_e) =>
					setModal({
						visible: true,
						description: 'Código expirado. Solicite um novo código.',
					}),
			)
			.with(
				{
					enteredCode: P.when((c) => c.join('').length === 6),

					comparisson: P.string,
				},
				(obj) => {
					const code = obj.enteredCode.join('')
					const comparisson = obj.comparisson.replace('-', '')
					if (code === comparisson) {
						console.log('Código válido:', code)
						navigate.stack('resetPassword', { flux, cpf, id: response.id })
					} else {
						setModal({
							visible: true,
							description: 'Código inválido. Tente novamente.',
						})
					}
				},
			)
			.otherwise(() => {})
	}

	async function sendCode() {
		try {
			console.log('Enviando código para', phone)
			const response = await passwordRecovery({ cpf, phone })
			setResponse({
				code: response.code,
				expiration: response.expiration,
				id: response?.userId ?? '',
				phone: response?.phone ?? phone,
			})

		} catch (error) {
			console.log(error)
		}
	}

	/*async function onSubmit(data: otpForm) {
		try {
			const response = await passwordRecovery({ cpf })
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
	}*/

	const handleCellTextChange = async (text: string, i: number) => {
		/*if (i === 0) {
		  const clippedText = await Clipboard.getStringAsync();
		  if (clippedText.slice(0, 1) === text) {
			input.current?.setValue(clippedText, true);
		  }
		}*/
		setCode((prevCount) => {
			const newCode = [...prevCount]
			newCode[i] = text
			return newCode
		})
	}
	// 	}
	//   };

	function formatTimer(seconds: number): string {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60

		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
	}

	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			{false  ? (

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
											(XX) XXXXX-{response?.phone?.slice(-4)}
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
												handleCellTextChange={handleCellTextChange}
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
										sendCode()
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
			) : (
				<SafeAreaView className='flex items-center justify-center'>
					<Text>Loading...</Text>
				</SafeAreaView>
			)
			}
		</KeyboardAvoidingView>
	)
}
