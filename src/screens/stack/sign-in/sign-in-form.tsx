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
import { mask, unMask } from 'react-native-mask-text'
import { setAuthProfile } from '@/utils'

const signInSchema = z.object({
	cpf: z.string().nonempty('CPF é obrigatório').length(11, 'CPF deve conter 11 caracteres'),
	password: z.string().nonempty('Senha é obrigatório'),
})

type SignInType = z.infer<typeof signInSchema>

export function SignInForm() {
	const { stack } = useNavigate()
	const [hidePassword, setHidePassword] = useState('hidden')
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
			console.log('Tentando fazer login com:', user)
			const auth = await signIn({ ...user })
			console.log('Resposta do signIn:', auth)

			await setAuthProfile(auth, dispatch)

			console.log('LOG: Usuário autenticado a partir do login manual')
			stack('tab')
		} catch (error: any) {
			setShowErrorModal(true)
			if (error.response) {
				console.log('Erro Axios - response:', error.response)
				console.log('Erro Axios - data:', error.response.data)
				console.log('Erro Axios - status:', error.response.status)
			} else if (error.request) {
				console.log('Erro Axios - request:', error.request)
			} else {
				console.log('Erro desconhecido:', error.message)
			}
			console.log('Erro ao fazer login em SignIn. Erro retornado: ', error)
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
							value={mask(value || '', '999.999.999-99')}
							onChangeText={(text) => onChange(unMask(text).slice(0, 11))}
							hasError={!!errors.cpf}
						/>
						{errors.cpf && <Text className="text-red-500">{errors.cpf.message}</Text>}
					</View>
				)}
			/>
			<View className="">
				<Controller
					control={control}
					name="password"
					render={({ field: { onChange, value } }) => (
						<Input
							key={hidePassword ? 'hidden' : 'shown'}
							placeholder="Senha"
							IconRight={hidePassword === 'hidden' ? 'eye-off' : 'eye'}
							iconPress={() => setHidePassword(hidePassword === 'hidden' ? 'shown' : 'hidden')}
							secureTextEntry={hidePassword === 'hidden' ? true : false}
							onChangeText={onChange}
							value={value}
							hasError={!!errors.password}
							inputStyle={{
								color: '#111827', // texto visível
								letterSpacing: hidePassword === 'shown' ? 0 : 3, // evitar bug de render
								fontFamily: hidePassword === 'shown' ? undefined : 'Inter', // sem fonte custom com senha
							}}
						/>
					)}
				/>
				{errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
			</View>
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
