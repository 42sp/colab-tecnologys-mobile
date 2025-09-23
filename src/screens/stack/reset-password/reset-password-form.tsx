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

const SecuritySettingsSchema = z
	.object({
		newPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
		confirmPassword: z.string().nonempty('A confirmação da senha é obrigatória'),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: 'As senhas não correspondem',
		path: ['confirmPassword'],
	})

type SecuritySettingsType = z.infer<typeof SecuritySettingsSchema>

export function ResetPasswordForm() {
	const { userId, cpf, accessToken, exp } = useSelector(
		(state: RootState) => state.passwordRecovery,
	)
	const isExpired = accessToken && Date.now() > Number(exp) * 1000
	const dispatch = useDispatch()
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
	})
	const { stack } = useNavigate()

	useEffect(() => {
		if (!accessToken || isExpired) {
			setModal({
				visible: true,
				description: 'Não foi possível resetar sua senha. Tente novamente mais tarde.',
			})
			stack('forgotPassword')
		}
	}, [])

	async function onSubmit({ newPassword }: SecuritySettingsType) {
		try {
			if (!userId || !cpf) {
				setModal({
					visible: true,
					description: 'Não foi possível resetar sua senha. Tente novamente mais tarde.',
				})
			}
			await patchUsers({ id: userId, cpf: cpf, password: newPassword })

			dispatch(clearPasswordRecovery())
			stack('signIn')
		} catch (error) {
			console.log(error)
			setModal({
				visible: true,
				description: 'Não foi possível resetar sua senha. Tente novamente mais tarde.',
			})
		}
	}

	const [hideNewPassword, setHideNewPassword] = useState(true)
	const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

	return (
		<View className=" gap-5 px-4 pb-4 ">
			<Card className=" gap-5">
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
					<Text className="font-inter text-gray-500">{'\u2022'} Crie uma senha forte e única</Text>
					<Text className="font-inter text-gray-500">
						{'\u2022'} Nunca compartilhe suas credenciais
					</Text>
					<Text className="font-inter text-gray-500">
						{'\u2022'} Ative a autenticação biométrica
					</Text>
					<Text className="font-inter text-gray-500">{'\u2022'} Mude sua senha regularmente</Text>
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
