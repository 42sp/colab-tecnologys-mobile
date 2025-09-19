import { Text, TouchableOpacity, View } from 'react-native'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useNavigate } from '@/libs/react-navigation/useNavigate'
import { useDispatch } from 'react-redux'
import { signIn } from '@/api/sign-in'
import { LogModal } from '@/components/ui/log-modal'
import { saveAuthSecureStore } from '@/libs/expo-secure-store/expo-secure-store'
import { LoadingModal } from '@/components/ui/loading-modal'
import { loadAuthSecureStore } from '@/libs/expo-secure-store/load-auth-secure-store'

const signInSchema = z.object({
	cpf: z.string().nonempty('CPF é obrigatório').length(11, 'CPF deve conter 11 caracteres'),
	password: z.string().nonempty('Senha é obrigatório'),
})

type SignInType = z.infer<typeof signInSchema>

export function SignInForm() {
	const { stack, drawer } = useNavigate()
	const [hidePassword, setHidePassword] = useState(true)
	const dispatch = useDispatch()
	const [showErrorModal, setShowErrorModal] = useState(false)

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInType>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			cpf: '',
			password: '',
		},
	})

	async function onSubmit(user: SignInType) {
		try {
			const auth = await signIn({ ...user })
			const { accessToken } = auth
			const { payload } = auth.authentication
			await saveAuthSecureStore([
				{ key: 'token', value: accessToken },
				{ key: 'expiryDate', value: payload.exp.toString() },
				{ key: 'userid', value: payload.sub.toString() },
			])
			await loadAuthSecureStore(dispatch)
			console.log('LOG: Usuário autenticado a partir do login manual')
			drawer('home')
		} catch (error) {
			setShowErrorModal(true)
			console.log(error)
		}
	}

	return (
		<View className="my-5 gap-5">
			<Controller
				control={control}
				name="cpf"
				render={({ field: { onChange, onBlur, value } }) => (
					<View>
						<Input
							keyboardType="numeric"
							autoCapitalize="none"
							placeholder="CPF"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							hasError={!!errors.cpf}
						/>
						{errors.cpf && <Text className="text-red-500">{errors.cpf.message}</Text>}
					</View>
				)}
			/>

			<Controller
				control={control}
				name="password"
				render={({ field: { onChange, onBlur, value } }) => (
					<View>
						<Input
							placeholder="Senha"
							IconRight="eye"
							iconPress={() => (hidePassword ? setHidePassword(false) : setHidePassword(true))}
							secureTextEntry={hidePassword}
							onChangeText={onChange}
							onBlur={onBlur}
							value={value}
							hasError={!!errors.password}
						/>
						{errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
					</View>
				)}
			/>

			<TouchableOpacity
				activeOpacity={0.5}
				onPress={() => {
					stack('forgotPassword')
				}}
			>
				<Text className="self-end font-inter-bold text-blue-500">Esqueci a senha</Text>
			</TouchableOpacity>

			<Button title="Entrar" onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />

			<View className=" items-center">
				<View className="flex-row">
					<Text className="font-inter">Não tem uma conta? </Text>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => {
							stack('signUp')
						}}
					>
						<Text className="font-inter-bold text-blue-500">Criar conta</Text>
					</TouchableOpacity>
				</View>
			</View>
			<LoadingModal visible={isSubmitting} />
			<LogModal
				visible={showErrorModal}
				description="Verifique os dados e tente novamente."
				onClose={() => setShowErrorModal(false)}
			/>
		</View>
	)
}
