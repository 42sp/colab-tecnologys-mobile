import { ActivityIndicator, Modal, Text, View } from 'react-native'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Dropdown, ItemType } from '@/components/ui/dropdown'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { useNavigate } from '@/libs/react-navigation/useNavigate'
import { useDispatch } from 'react-redux'
import { getRoles } from '@/api/get-roles'
import { createUser } from '@/api/create-user'
import { signIn } from '@/api/sign-in'
import { setAuth } from '@/libs/redux/auth/auth-slice'
import { createProfile } from '@/api/create-profile'
import { setUser } from '@/libs/redux/user/user-slice'
import { setProfile } from '@/libs/redux/user-profile/user-profile-slice'

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

type RolesType = {
	id: string
} & ItemType

export function SignUpForm() {
	const { stack, drawer } = useNavigate()
	const [hidePassword, setHidePassword] = useState(true)

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
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
	const [rolesList, setRolesList] = useState<RolesType[]>([])
	const dispatch = useDispatch()

	const fetchRolesList = async () => {
		try {
			const roles = await getRoles()
			const list = roles.data.map(({ id, role_name }) => ({ id, label: role_name }))
			setRolesList(list)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchRolesList()
	}, [])

	async function onSubmit(profile: SignUpType) {
		console.log('Dados de registro ', profile.jobTitle)
		try {
			const user = await createUser({
				cpf: profile.cpf,
				password: profile.password,
				role_id: profile.jobTitle,
			})
			const auth = await signIn({ cpf: profile.cpf, password: profile.password })

			const { payload } = auth.authentication
			dispatch(setAuth({ token: auth.accessToken, expiry: payload.exp, id: payload.sub }))

			const newProfile = await createProfile({
				name: profile.name,
				phone: profile.name,
			})

			dispatch(
				setUser({
					id: user.id,
					cpf: user.cpf,
					roleId: user.role_id,
					profileId: user.profile_id,
					isActive: user.is_active,
					isAvailable: user.is_available,
					createdAt: user.created_at,
					updatedAt: user.updated_at,
				}),
			)
			dispatch(
				setProfile({
					name: newProfile.name,
					dateOfBirth: newProfile.date_of_birth,
					registrationCode: newProfile.registration_code,
					phone: newProfile.phone,
					address: newProfile.address,
					city: newProfile.city,
					state: newProfile.state,
					postcode: newProfile.postcode,
					photo: newProfile.photo,
					updatedAt: newProfile.updated_at,
				}),
			)
			drawer('home')
		} catch (error) {
			console.log(error)
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
							options={rolesList}
							variant="default"
							placeholder="Selecione uma opção"
							value={rolesList.find((item) => item.id === value)?.label || ''} // mostra label
							onChangeText={(selectedLabel) => {
								const selected = rolesList.find((item) => item.label === selectedLabel)
								if (selected) onChange(selected.id)
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

			<Button
				title="Criar conta"
				onPress={handleSubmit(onSubmit)}
				className="my-5"
				disabled={isSubmitting}
			/>
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
			<Modal transparent={true} animationType="none" visible={isSubmitting}>
				<View className="flex-1 items-center justify-center">
					<ActivityIndicator size={52} color="#FF6700" />
				</View>
			</Modal>
		</View>
	)
}
