import { Text, View } from 'react-native'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Dropdown } from '@/components/ui/dropdown'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useNavigate } from '@/libs/react-navigation/useNavigate'
import { usePostUser } from '@/api/post-user'
import { useDispatch } from 'react-redux'
import { setUser } from '@/libs/redux/user/user-slice'
import { usePostAuthSignIn } from '@/api/post-auth-sign-in'
import { setAuth } from '@/libs/redux/auth-sign-in/auth-sign-in-slice'
import { useGetRoles } from '@/api/get-roles'
import { usePostProfile } from '@/api/post-profile'

const signUpSchema = z
	.object({
		name: z.string().nonempty('Nome é obrigatório'),
		email: z.string(),
		cpf: z.string().length(11, 'CPF deve conter 11 caracteres'),
		phone: z.string().nonempty('Número de telefone é obrigatório'),
		jobTitle: z.string().nonempty('Função é obrigatório'),
		password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
		confirmPassword: z.string().nonempty('Confirme sua senha'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'As senhas não correspondem',
		path: ['confirmPassword'],
	})

type SignUpType = z.infer<typeof signUpSchema>

export function SignUpForm() {
	const { stack, drawer } = useNavigate()
	const [hidePassword, setHidePassword] = useState(true)
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: '',
			email: '',
			cpf: '',
			phone: '',
			jobTitle: '',
			password: '',
			confirmPassword: '',
		},
	})
	const { items } = useGetRoles()
	const { fetchData: postUser } = usePostUser()
	const { data: dataAuth, fetchData: postAuth } = usePostAuthSignIn()
	const { data: dataProfile, fetchData: postProfile } = usePostProfile()
	const dispatch = useDispatch()

	const onSubmit = async (profile: SignUpType) => {
		console.log('Dados de registro ', profile)

		// post user
		if (postUser) {
			console.log('chamando postUser')
			const responseUser = await postUser({
				data: { cpf: profile.cpf, password: profile.password, role_id: profile.jobTitle },
			})
			console.log('Dados do postUser: ', responseUser)

			if (responseUser) {
				dispatch(
					setUser({
						id: responseUser.id,
						cpf: responseUser.cpf,
						roleId: responseUser.role_id,
						profileId: responseUser.profile_id,
						isActive: responseUser.is_active,
						isAvailable: responseUser.is_available,
						createdAt: responseUser.created_at,
						updatedAt: responseUser.updated_at,
					}),
				)
			}
			// post auth
			if (postAuth && responseUser) {
				console.log('chamando postAuth')
				const responseAuth = await postAuth({
					data: { strategy: 'local', cpf: profile.cpf, password: profile.password },
				})
				console.log('Dados do postAuth:', responseAuth)

				if (responseAuth) {
					dispatch(
						setAuth({
							token: responseAuth.accessToken,
							expiry: responseAuth.authentication.payload.exp,
							id: responseAuth.user.id,
						}),
					)
				}
				// post profile
				if (postProfile && responseAuth) {
					console.log('chamando postProfile')
					const responseProfile = await postProfile({
						data: {
							name: profile.name,
							email: profile.email,
							phone: profile.phone,
							date_of_birth: '2003-02-01',
							registration_code: 'REG-2025-008',
							address: 'Rua Exemplo, 123',
							city: 'São Paulo',
							state: 'SP',
							postcode: '01234-567',
							user_id: responseUser.id,
						},
					})
					console.log('response postProfile: ', responseProfile)
					console.log('indo pra perfil')
					drawer('profile')
				}
			}
		}
	}

	return (
		<View className="h-full items-center justify-between gap-5 ">
			<View className="gap-1">
				<Text>Nome completo</Text>
				<Controller
					control={control}
					name="name"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="Digite seu nome completo"
							IconLeft={'user'}
							className="self-center"
							onChangeText={onChange}
							value={value}
							hasError={!!errors.name}
						/>
					)}
				/>
				{errors.name && <Text className="text-red-500">{errors.name.message}</Text>}
			</View>
			<View className="gap-1">
				<Text>E-mail</Text>
				<Controller
					control={control}
					name="email"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="seu-email@email.com"
							keyboardType="email-address"
							autoCapitalize="none"
							IconLeft={'mail'}
							className="self-center"
							onChangeText={onChange}
							value={value}
							hasError={!!errors.email}
						/>
					)}
				/>
				{errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
			</View>
			<View className="gap-1">
				<Text>CPF</Text>
				<Controller
					control={control}
					name="cpf"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="000.000.000-00"
							keyboardType="numeric"
							IconLeft={'file'}
							className="self-center"
							onChangeText={onChange}
							value={value}
							hasError={!!errors.cpf}
						/>
					)}
				/>
				{errors.cpf && <Text className="text-red-500">{errors.cpf.message}</Text>}
			</View>
			<View className="gap-1">
				<Text>Número de telefone</Text>
				<Controller
					control={control}
					name="phone"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="(00) 00000 0000"
							keyboardType="phone-pad"
							IconLeft={'phone'}
							className="self-center"
							onChangeText={onChange}
							value={value}
							hasError={!!errors.phone}
						/>
					)}
				/>
				{errors.phone && <Text className="text-red-500">{errors.phone.message}</Text>}
			</View>
			<View className="gap-1">
				<Text>Função</Text>
				<Controller
					control={control}
					name="jobTitle"
					render={({ field: { onChange, value } }) => (
						<Dropdown
							IconLeft={'briefcase'}
							IconRight={'chevron-down'}
							options={items}
							variant="default"
							placeholder="Selecione uma opção"
							value={items.find((item) => item.id === value)?.label || ''} // mostra label
							onChangeText={(selectedLabel) => {
								// encontra o item pelo label e guarda o id
								const selected = items.find((item) => item.label === selectedLabel)
								if (selected) onChange(selected.id) // guarda role_id
							}}
							hasError={!!errors.jobTitle}
						/>
					)}
				/>
				{errors.jobTitle && <Text className="text-red-500">{errors.jobTitle.message}</Text>}
			</View>
			<View className="gap-1">
				<Text>Senha</Text>
				<Controller
					control={control}
					name="password"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="Digite sua senha"
							IconLeft={'lock'}
							IconRight={hidePassword ? 'eye' : 'eye-off'}
							iconPress={() => setHidePassword(!hidePassword)}
							secureTextEntry={hidePassword}
							className="self-center"
							value={value}
							onChangeText={onChange}
							hasError={!!errors.password}
						/>
					)}
				/>
				{errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
			</View>
			<View className="gap-1">
				<Text>Confirmar senha</Text>
				<Controller
					control={control}
					name="confirmPassword"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="Confirme sua senha"
							IconLeft={'lock'}
							IconRight={hidePassword ? 'eye' : 'eye-off'}
							iconPress={() => setHidePassword(!hidePassword)}
							secureTextEntry={hidePassword}
							className="self-center"
							onChangeText={onChange}
							value={value}
							hasError={!!errors.confirmPassword}
						/>
					)}
				/>
				{errors.confirmPassword && (
					<Text className="text-red-500">{errors.confirmPassword.message}</Text>
				)}
			</View>

			<Button title="Criar conta" onPress={handleSubmit(onSubmit)} className="my-5" />
			<View className="py-5">
				<Text>
					Já tem uma conta?
					<Text
						onPress={() => {
							stack('signUp')
						}}
						className="font-inter-bold text-blue-500"
					>
						{' '}
						Entrar
					</Text>
				</Text>
			</View>
		</View>
	)
}
