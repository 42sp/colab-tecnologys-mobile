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

const SecuritySettingsSchema = z
	.object({
		currentPassword: z.string().nonempty('Current password is required'),
		newPassword: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string().nonempty('Confirm password is required'),
	})

	// validar se o currentPassword é igual ao password armazenado

	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

type SecuritySettingsType = z.infer<typeof SecuritySettingsSchema>

export function SecuritySettingsForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SecuritySettingsType>({
		resolver: zodResolver(SecuritySettingsSchema),
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},
	})

	const { drawer } = useNavigate()

	function onSubmit(data: SecuritySettingsType) {
		console.log('Dados de Registro: ', JSON.stringify(data))
		drawer('profile')
	}

	const [hideCurrentPassword, setHideCurrentPassword] = useState(true)
	const [hideNewPassword, setHideNewPassword] = useState(true)
	const [hideConfirmPassword, setHideConfirmPassword] = useState(true)

	return (
		<View className=" mt-6 gap-5 px-4 pb-4 ">
			<Card className=" gap-5">
				<Card.Header>
					<Text className="font-inter-bold text-xl">Gerenciar senha</Text>
				</Card.Header>
				<Card.Body className="gap-5 pb-10">
					<View className="gap-1">
						<Text>Senha atual</Text>
						<Controller
							control={control}
							name="currentPassword"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder="Digite sua senha atual"
									IconLeft={'lock'}
									IconRight={hideCurrentPassword ? 'eye-off' : 'eye'}
									iconPress={() => setHideCurrentPassword(!hideCurrentPassword)}
									secureTextEntry={hideCurrentPassword}
									className="self-center"
									value={value}
									onChangeText={onChange}
									hasError={!!errors.currentPassword}
								/>
							)}
						/>
						{errors.currentPassword && (
							<Text className="text-red-500">{errors.currentPassword.message}</Text>
						)}
					</View>
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
							<Text className="font-inter text-gray-500">Use seu rosto para fazer login
							</Text>
						</View>
						<View className="p-2">
							<ToggleButton />
						</View>
					</View>
				</Card.Footer>
			</Card>
			<Button className="flex-1" onPress={handleSubmit(onSubmit)}>
				<Text className="font-inter-medium text-xl text-neutral-100">Salvar mudanças</Text>
			</Button>
			<Card className="gap-5">
				<Card.Header>
					<Text className="font-inter-bold text-xl">Dicas de segurança</Text>
				</Card.Header>
				<Card.Body>
					<Text className="font-inter text-gray-500">
						{'\u2022'} Crie uma senha forte e única
					</Text>
					<Text className="font-inter text-gray-500">
						{'\u2022'} Nunca compartilhe suas credenciais
					</Text>
					<Text className="font-inter text-gray-500">
						{'\u2022'} Ative a autenticação biométrica
					</Text>
					<Text className="font-inter text-gray-500">
						{'\u2022'} Mude sua senha regularmente
					</Text>
				</Card.Body>
			</Card>
		</View>
	)
}
