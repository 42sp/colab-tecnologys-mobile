import { Text, View, Image } from 'react-native'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { ToggleButton } from '@/components/ui/toggle-button'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useNavigate } from '@/libs/react-navigation/useNavigate'
import { ScanFace } from 'lucide-react-native'
import { patchUsers } from '@/api/patch-users'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import { signIn } from '@/api/sign-in'
import { setAuth } from '@/libs/redux/auth/auth-slice'
import { getProfile } from '@/api/get-profile'
import { setProfile } from '@/libs/redux/user-profile/user-profile-slice'

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
	const { cpf, userId } = useSelector((state: RootState) => state.passwordRecovery)
	const dispatch = useDispatch()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SecuritySettingsType>({
		resolver: zodResolver(SecuritySettingsSchema),
	})

	const { drawer } = useNavigate()

	async function onSubmit({ newPassword }: SecuritySettingsType) {
		try {
			if (!userId || !cpf) throw new Error('Erro inesperado')

			const user = await patchUsers({ id: userId, cpf: cpf, password: newPassword })

			const auth = await signIn({ cpf: user.cpf, password: newPassword })
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
			drawer('home')
		} catch (error) {
			console.log(error)
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
			<Button className="flex-1" onPress={handleSubmit(onSubmit)}>
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
		</View>
	)
}
