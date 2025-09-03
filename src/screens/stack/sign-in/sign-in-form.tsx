import { Text, TouchableOpacity, View } from 'react-native'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useNavigate } from '@/libs/react-navigation/useNavigate'
import { useDispatch } from 'react-redux'
import { setAuth } from '@/libs/redux/auth-sign-in/auth-sign-in-slice'
import { usePostAuthSignIn } from '@/api/post-auth-sign-in'

const signInSchema = z.object({
	cpf: z.string().nonempty('CPF é obrigatório').length(11, 'CPF deve conter 11 caracteres'),
	password: z.string().nonempty('Senha é obrigatório'),
})

type SignInType = z.infer<typeof signInSchema>

export function SignInForm() {
	const { stack, drawer } = useNavigate()
	const [hidePassword, setHidePassword] = useState(true)
	const dispatch = useDispatch()

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

	const { fetchData: postAuthSignIn } = usePostAuthSignIn()

	const onSubmit = async (user: SignInType) => {
		if (postAuthSignIn) {
			const responseAuth = await postAuthSignIn({ data: { strategy: 'local', ...user } })
			if (responseAuth) {
				dispatch(
					setAuth({
						token: responseAuth.accessToken,
						expiry: responseAuth.authentication.payload.exp,
						id: responseAuth.user.id,
					}),
				)
				drawer('profile')
			}
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
		</View>
	)
}
