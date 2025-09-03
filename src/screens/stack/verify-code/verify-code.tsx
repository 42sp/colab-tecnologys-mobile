import { useEffect, useRef, useState } from 'react'
import {
	Text,
	View,
	TextInput,
	Keyboard,
	TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'

export default function VerifyCode() {
	const [code, setCode] = useState(['', '', '', '', '', ''])
	const inputs = useRef<Array<TextInput | null>>([])

	useEffect(() => {
		setTimeout(() => {
			if (inputs.current[0]) {
				inputs.current[0]?.focus()
			}
		}, 100)
	}, [])

	const handleChange = (text: string, index: number) => {
		if (text.length > 1) return
		const newCode = [...code]
		newCode[index] = text
		setCode(newCode)

		if (text) {
			if (index < inputs.current.length - 1) {
				inputs.current[index + 1]?.focus()
			} else {
				Keyboard.dismiss()
			}
		}
	}

	const handleBackspace = (index: number) => {
		const newCode = [...code]
		newCode[index] = ''
		setCode(newCode)

		if (index > 0) {
			inputs.current[index - 1]?.focus()
		}
	}

	return (
		<SafeAreaView>
			<View className="mx-4 bg-white p-10">
				<View className="my-4 px-4">
					<Image
						source={require('@/assets/fingerprint-icon.png')}
						className="h-20 w-20 self-center"
						resizeMode="contain"
					/>
					<Text className="mt-4 text-center text-2xl font-bold">Verificação de Código</Text>
					<Text className="mt-4 text-center text-lg text-gray-500">
						Digite o texto enviado para
					</Text>
					<View className="mt-2 flex-row items-center justify-center gap-2">
						<Text className="text-center text-lg font-bold text-gray-500">
							+55 (11) 9999-****
						</Text>
						<FontAwesome name="whatsapp" size={24} color="#25D366" />
					</View>
				</View>

				<View className="my-6 flex-row justify-center gap-2">
					{code.map((digit, index) => (
						<TextInput
							key={index}
							ref={(ref) => {
								inputs.current[index] = ref
							}}
							className="h-12 w-12 items-center justify-center rounded-lg border border-gray-300 bg-white text-center"
							keyboardType="numeric"
							maxLength={1}
							value={digit}
							onChangeText={(text) => handleChange(text, index)}
							onKeyPress={({ nativeEvent }) => {
								if (nativeEvent.key === 'Backspace') {
									handleBackspace(index)
								}
							}}
						/>
					))}
				</View>

				<Button
					title="Verificar"
					onPress={() => {
						console.log('Código inserido:', code.join(''))
					}}
				/>

				<Text className="mt-4 text-center font-bold text-blue-400">
					Aguarde 00:30 segundos para enviar novamente
				</Text>

				<TouchableOpacity
					className="mt-6 self-center"
					activeOpacity={0.5}
					onPress={() => console.log('Reenviar código')}
				>
					<Text className="text-center font-inter-bold text-base leading-6 text-blue-400">
						Reenviar código
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}
