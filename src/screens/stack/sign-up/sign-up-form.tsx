import { Text, View } from 'react-native'
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
import { LogModal } from '@/components/ui/log-modal'
import { saveAuthSecureStore } from '@/libs/expo-secure-store/expo-secure-store'
import { LoadingModal } from '@/components/ui/loading-modal'
import { loadAuthSecureStore } from '@/libs/expo-secure-store/load-auth-secure-store'
import { mask, unMask } from 'react-native-mask-text'
import { setSignUp } from '@/libs/redux/sign-up/signup-slice'
import { passwordRecovery } from '@/api/password-recovery'

const signUpSchema = z.object({
	name: z.string().nonempty('Nome é obrigatório'),
	email: z.string(),
	cpf: z.string().length(11, 'CPF deve conter 11 caracteres'),
	phone: z.string().nonempty('Número de telefone é obrigatório'),
	jobTitle: z.string().nonempty('Função é obrigatória'),
})

type SignUpType = z.infer<typeof signUpSchema>

type RolesType = {
	id: string
	role_name: string
} & ItemType

export function SignUpForm() {
	const navigate = useNavigate()
	const [hidePassword, setHidePassword] = useState(true)
	const [modal, setModal] = useState<{
		visible: boolean
		description: string
	}>({
		visible: false,
		description: '',
	})

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
			//password: '',
			//confirmPassword: '',
		},
	})
	const [rolesList, setRolesList] = useState<RolesType[]>([])
	const dispatch = useDispatch()

	async function fetchRolesList() {
		console.log('fetchRolesList')
		try {
			const roles = (await getRoles()) as any
			console.log('roles', roles)
			const list = roles.map(({ id, role_name }: any) => ({ id, label: role_name }))
			setRolesList(list)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchRolesList()
	}, [])

	async function onSubmit(profile: SignUpType) {
		console.log('Dados de registro ', profile)
		const jobTitle = rolesList.find((r) => r.id === profile.jobTitle)?.role_name
		const role_id = profile.jobTitle
		dispatch(setSignUp({ ...profile, jobTitle: jobTitle || '', roleId: role_id }))
		//await passwordRecovery({ cpf: profile.cpf, phone: profile.phone })
		navigate.stack('verifyCode', { flux: 'first-access', cpf: profile.cpf, phone: profile.phone })
		try {
			/*await createUser({
				cpf: profile.cpf,
				password: profile.password,
			})*/
			//const auth = await signIn({ cpf: profile.cpf, password: profile.password })
			//const { payload } = auth.authentication
			/*await saveAuthSecureStore([
				{ key: 'token', value: auth.accessToken },
				{ key: 'expiryDate', value: payload.exp.toString() },
				{ key: 'userid', value: payload.sub.toString() },
			])
			dispatch(setAuth({ token: auth.accessToken, expiry: payload.exp, id: payload.sub }))
			await createProfile({
				name: profile.name,
				phone: profile.phone,
				role_id: profile.jobTitle,
			})
			await loadAuthSecureStore(dispatch)*/
		} catch (error) {
			console.log(error)
			setModal({
				visible: true,
				description: 'Não foi possível criar uma conta. Tente novamente mais tarde.',
			})
		}
	}

	return (
		<View className="gap-5 p-10 ">
			<View className="gap-1">
				<Text>Nome completo *</Text>
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
				<Text>CPF *</Text>
				<Controller
					control={control}
					name="cpf"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="000.000.000-00"
							keyboardType="numeric"
							IconLeft={'file'}
							className="self-center"
							value={mask(value || '', '999.999.999-99')}
							onChangeText={(text) => onChange(unMask(text).slice(0, 11))}
							hasError={!!errors.cpf}
						/>
					)}
				/>
				{errors.cpf && <Text className="text-red-500">{errors.cpf.message}</Text>}
			</View>
			<View className="gap-1">
				<Text>Número de telefone *</Text>
				<Controller
					control={control}
					name="phone"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="(00) 00000-0000"
							keyboardType="phone-pad"
							IconLeft={'phone'}
							className="self-center"
							value={mask(value || '', '(99) 9 9999-9999')}
							onChangeText={(text) => onChange(unMask(text).slice(0, 11))}
							hasError={!!errors.phone}
						/>
					)}
				/>
				{errors.phone && <Text className="text-red-500">{errors.phone.message}</Text>}
			</View>
			<View className="gap-1">
				<Text>Função *</Text>
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

			<Button
				title="Criar conta"
				onPress={handleSubmit(onSubmit)}
				className="my-5"
				disabled={isSubmitting}
			/>
			<View className="items-center pb-5">
				<Text>
					Já tem uma conta?
					<Text
						onPress={() => {
							navigate.navigation.goBack()
						}}
						className="font-inter-bold text-blue-500"
					>
						{' '}
						Entrar
					</Text>
				</Text>
			</View>
			<LoadingModal visible={isSubmitting} />
			<LogModal
				visible={modal.visible}
				description={modal.description}
				onClose={() => setModal({ visible: false, description: '' })}
			/>
		</View>
	)
}
