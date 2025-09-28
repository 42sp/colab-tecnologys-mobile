import { Text, View } from 'react-native'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { ToggleButton } from '@/components/ui/toggle-button'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useEffect } from 'react'
import { useNavigate } from '@/libs/react-navigation/useNavigate'
import { ScanFace } from 'lucide-react-native'
import { patchUsers } from '@/api/patch-users'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import { clearPasswordRecovery } from '@/libs/redux/password-recovery/password-recovery-slice'
import { LogModal } from '@/components/ui/log-modal'
import { LoadingModal } from '@/components/ui/loading-modal'
import { createUser } from '@/api/create-user'
import { saveAuthSecureStore } from '@/libs/expo-secure-store/expo-secure-store'
import { loadAuthSecureStore } from '@/libs/expo-secure-store/load-auth-secure-store'
import { setAuth } from '@/libs/redux/auth/auth-slice'

const SecuritySettingsSchema = z
	.object({
		newPassword: z
			.string()
			.min(6, 'Senha deve ter no mínimo 6 caracteres')
			.regex(/[0-9]/, 'Senha deve conter pelo menos 1 número')
			.regex(/[a-z]/, 'Senha deve conter pelo menos 1 letra minúscula')
			.regex(/[A-Z]/, 'Senha deve conter pelo menos 1 letra maiúscula')
			.regex(/[^A-Za-z0-9]/, 'Senha deve conter pelo menos 1 caractere especial'),
		confirmPassword: z.string().nonempty('A confirmação da senha é obrigatória'),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'As senhas não correspondem',
		path: ['confirmPassword'],
	})

type SecuritySettingsType = z.infer<typeof SecuritySettingsSchema>

// const flux = 'first-access' // 'reset-password' ou 'first-access'

export function ResetPasswordForm({ route }: any) {
	const { userId, accessToken, exp } = useSelector((state: RootState) => state.passwordRecovery)
	const { name, cpf, email, phone, roleId } = useSelector((state: RootState) => state.signUp)
	const isExpired = accessToken && Date.now() > Number(exp) * 1000
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { flux } = route.params
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
	} = useForm<SecuritySettingsType>({
		resolver: zodResolver(SecuritySettingsSchema),
		defaultValues: {
			newPassword: '',
			confirmPassword: '',
		},
	})
	const { popToTop } = useNavigate().navigation

	useEffect(() => {
		if (accessToken && exp) {
			if (!accessToken || isExpired) {
				setModal({
					visible: true,
					description: 'Não foi possível resetar sua senha. Tente novamente mais tarde.',
				})
				popToTop()
			}
		}
	}, [accessToken, exp])
	async function onSubmit({ newPassword }: SecuritySettingsType) {
		try {
			//dispatch(clearPasswordRecovery())
			//popToTop()
			if (flux === 'reset-password') {
				await patchUsers({ id: userId, cpf: cpf, password: newPassword })
			} else {
				const payload = await createUser({
					cpf,
					password: newPassword,
					name,
					email,
					phone,
					roleId,
				})

				console.log('Dados do novo usuário:', payload)

				await saveAuthSecureStore([
					{ key: 'token', value: payload.accessToken },
					{ key: 'profile_id', value: payload.profile_id },
					{ key: 'userid', value: payload.id },
				])

				dispatch(setAuth(payload.accessToken))
			}
		} catch (error) {
			console.log(error)
			setModal({
				visible: true,
				description: 'Não foi possível resetar sua senha. Tente novamente mais tarde.',
			})
			popToTop()
		}
	}

	const [hideNewPassword, setHideNewPassword] = useState(true)
	const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

	return (
		<View className="mb-20 gap-5 p-5">
			<Card className="gap-5">
				<Card.Body className="gap-5 pb-10">
					<View className="gap-1">
						<Text>Nova senha</Text>
						<Controller
							control={control}
							name="newPassword"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder="Nova senha"
									IconLeft={'lock'}
									IconRight={hideNewPassword ? 'eye-off' : 'eye'}
									iconPress={() => setHideNewPassword(!hideNewPassword)}
									secureTextEntry={hideNewPassword}
									className="self-center"
									value={value}
									onChangeText={onChange}
									hasError={!!errors.newPassword}
								/>
							)}
						/>
						{errors.newPassword && (
							<Text className="text-red-500">{errors.newPassword.message}</Text>
						)}
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
									IconRight={hideConfirmPassword ? 'eye-off' : 'eye'}
									iconPress={() => setHideConfirmPassword(!hideConfirmPassword)}
									secureTextEntry={hideConfirmPassword}
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
				</Card.Body>
				<Card.Footer className="gap-5">
					<View className="h-px bg-neutral-300" />
					<View className="flex flex-row items-center gap-5">
						<View className="size-14 items-center justify-center rounded-full bg-blue-100">
							<ScanFace size={26} color={'#3b82f6'} />
						</View>
						<View className="flex-1">
							<Text className="font-inter-medium">Reconhecimento facial</Text>
							<Text className="font-inter text-gray-500">Use seu rosto para fazer login</Text>
						</View>
						<View className="p-2">
							<ToggleButton />
						</View>
					</View>
				</Card.Footer>
			</Card>
			<Button className="flex-1" onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
				<Text className="font-inter-medium text-xl text-neutral-100">Salvar alterações</Text>
			</Button>
			<Card className="gap-5">
				<Card.Header>
					<Text className="font-inter-bold text-xl">Dicas de segurança</Text>
				</Card.Header>
				<Card.Body>
					<Text className="font-inter text-gray-500">Crie uma senha forte e única</Text>
					<Text className="font-inter text-gray-500">Nunca compartilhe suas credenciais</Text>
					<Text className="font-inter text-gray-500">Ative a autenticação biométrica</Text>
					<Text className="font-inter text-gray-500">Mude sua senha regularmente</Text>
				</Card.Body>
			</Card>
			<LoadingModal visible={isSubmitting} />
			<LogModal
				visible={modal.visible}
				description={modal.description}
				onClose={() => setModal({ visible: false, description: '' })}
			/>
		</View>
	)
}
