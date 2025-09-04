import { useEffect, useRef, useState } from 'react'
import { Text, View, TextInput, Keyboard, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@/libs/react-navigation/useNavigate'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const codeSchema = z.object({
	code: z
		.array(z.string().min(1, 'Digite todos os dígitos').regex(/^\d$/, 'Apenas números'))
		.length(6, 'O código deve ter 6 dígitos'),
})

type CodeForm = z.infer<typeof codeSchema>

export default function VerifyCode() {
	const { stack } = useNavigate()

	const inputs = useRef<Array<TextInput | null>>([])
	const [focusedIndex, setFocusedIndex] = useState<number | null>(null)

	const [timer, setTimer] = useState(30)
	const [isButtonDisabled, setIsButtonDisabled] = useState(true)

	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<CodeForm>({
		resolver: zodResolver(codeSchema),
		defaultValues: {
			code: ['', '', '', '', '', ''],
		},
	})

	useEffect(() => {
		setTimeout(() => {
			if (inputs.current[0]) {
				inputs.current[0]?.focus()
			}
		}, 100)
	}, [])

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

	const onSubmit = (data: CodeForm) => {
		const codeJSON = {code: parseInt(data.code.join(''), 10)}

		console.log('Dados do código: ', JSON.stringify(codeJSON))
		stack('resetPassword')
	}

	const handleChange = (text: string, index: number) => {
		if (text.length > 1) return

		setValue(`code.${index}`, text, { shouldValidate: true })

		if (text && index < inputs.current.length - 1) {
			inputs.current[index + 1]?.focus()
		} else if (index === inputs.current.length - 1) {
			Keyboard.dismiss()
		}
	}

	const handleBackspace = (index: number) => {
		setValue(`code.${index}`, '', { shouldValidate: true })

		if (index > 0) {
			inputs.current[index - 1]?.focus()
		}
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
					<Text className="mt-4 font-inter text-center text-lg text-gray-500">
						Digite o texto enviado para
					</Text>
					<View className="mt-2 flex-row items-center justify-center gap-2">
						<Text className="text-center text-lg font-inter-bold text-gray-500">+55 (11) 9999-****</Text>
						<FontAwesome name="whatsapp" size={24} color="#25D366" />
					</View>
				</View>

				<View className="my-6 flex-row justify-center gap-2">
					{Array.from({ length: 6 }).map((_, index) => (
						<Controller
							key={index}
							name={`code.${index}`}
							control={control}
							render={({ field: { value } }) => (
								<TextInput
									ref={(ref) => {
										inputs.current[index] = ref
									}}
									className={`h-12 w-12 items-center justify-center rounded-lg border ${
										focusedIndex === index ? 'border-2 border-blue-400' : 'border-gray-300'
									} bg-white text-center`}
									keyboardType="numeric"
									maxLength={1}
									value={value}
									onChangeText={(text) => handleChange(text, index)}
									onFocus={() => setFocusedIndex(index)}
									onBlur={() => setFocusedIndex(null)}
									onKeyPress={({ nativeEvent }) => {
										if (nativeEvent.key === 'Backspace') {
											handleBackspace(index)
										}
									}}
									selectionColor="transparent"
								/>
							)}
						/>
					))}
				</View>

				{errors.code && Array.isArray(errors.code) && (
					<Text className="pb-2 font-inter text-center text-red-500">
						{errors.code.find((err) => err?.message)?.message}
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
