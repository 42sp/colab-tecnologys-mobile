import { useEffect, useRef, useState } from 'react'
import OTPTextView from 'react-native-otp-textinput'
import { Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@/libs/react-navigation/useNavigate'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
// import Clipboard from 'expo-clipboard';
import { zodResolver } from '@hookform/resolvers/zod'

const otpSchema = z.object({
	otp: z.string().length(6, 'O código deve ter 6 dígitos').regex(/^\d{6}$/, 'Apenas números')
})

type otpForm = z.infer<typeof otpSchema>

export default function VerifyCode() {
	const { stack } = useNavigate()
	// const input = useRef<OTPTextView>(null);
	const [timer, setTimer] = useState(30)
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	const {
		control,
		handleSubmit,
		formState: { errors },
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

	const onSubmit = (data: otpForm) => {
		console.log("otp data: ",data)
		stack('resetPassword')
	}

	// const handleCellTextChange = async (text: string, i: number) => {
	// 	if (i === 0) {
	// 	  const clippedText = await Clipboard.getStringAsync();
	// 	  if (clippedText.slice(0, 1) === text) {
	// 		input.current?.setValue(clippedText, true);
	// 	  }
	// 	}
	//   };

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
					<Text className="mt-4 font-inter text-center text-lg text-gray-500">
						Digite o texto enviado para
					</Text>
					<View className="mt-2 flex-row items-center justify-center gap-2">
						<Text className="text-center text-lg font-inter-bold text-gray-500">+55 (11) 9999-****</Text>
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
									tintColor={"#d16a32"}
									textInputStyle={{width: 40, height: 50, }}/>
							  </ View>
							)}
						/>

				</View>

				{errors.otp && (
					<Text className="pb-2 font-inter text-center text-red-500">
						{errors.otp.message}
					</Text>
				)}

				<Button title="Verificar" onPress={handleSubmit(onSubmit)} />

				<Text className="mt-4 font-inter text-center font-bold text-blue-400">
					Aguarde {`00:${timer.toString().padStart(2, '0')}`} segundos para enviar novamente
				</Text>

				<TouchableOpacity
					className="mt-6 self-center font-inter"
					activeOpacity={0.5}
					onPress={() => {
						console.log('Reenviar código')
						setTimer(30)
						setIsButtonDisabled(true)
					}}
					disabled={isButtonDisabled}
				>
					<Text className="text-center font-inter-bold text-base leading-6 text-blue-400">
						Reenviar código
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}
