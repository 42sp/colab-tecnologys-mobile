import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useNavigate } from '@/libs/react-navigation/useNavigate'
import { useDispatch } from 'react-redux'
import { setAuth } from '@/libs/redux/auth/auth-slice'
import { signIn } from '@/api/sign-in'
import { getProfile } from '@/api/get-profile'
import { setProfile } from '@/libs/redux/user-profile/user-profile-slice'
import { setTasks } from '@/libs/redux/tasks/tasks-slice'
import { getTasks } from '@/api/get-tasks'

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

	async function onSubmit(user: SignInType) {
		try {
			const auth = await signIn({ ...user })
			const { accessToken } = auth
			const { payload } = auth.authentication
			dispatch(setAuth({ token: accessToken, expiry: payload.exp, id: payload.sub }))
			const profile = await getProfile()
			const userProfile = profile.data[0]
			dispatch(
				setProfile({
					name: userProfile.name,
					dateOfBirth: userProfile.date_of_birth,
					registrationCode: userProfile.registration_code,
					phone: userProfile.phone,
					address: userProfile.address,
					city: userProfile.city,
					state: userProfile.state,
					postcode: userProfile.postcode,
					photo: userProfile.photo,
					updatedAt: userProfile.updated_at,
				}),
			)
			const tasks = await getTasks()
			dispatch(setTasks(tasks))

			drawer('home')
		} catch (error) {
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
			<Modal transparent={true} animationType="none" visible={isSubmitting}>
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size={52} color="#FF6700" />
				</View>
			</Modal>
		</View>
	)
}
