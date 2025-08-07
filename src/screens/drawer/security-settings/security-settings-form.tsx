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

const SecuritySettingsSchema = z
	.object({
		currentPassword: z.string(),
		newPassword: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string(),
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
					<Text className="font-inter-bold text-xl">Manage password</Text>
				</Card.Header>
				<Card.Body className="gap-5 pb-10">
					<View className="gap-1">
						<Text>Current password</Text>
						<Controller
							control={control}
							name="currentPassword"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder="Type your current password"
									IconLeft={'lock'}
									IconRight={hideCurrentPassword ? 'eye-off' : 'eye'}
									iconPress={() => setHideCurrentPassword(!hideCurrentPassword)}
									secureTextEntry={hideCurrentPassword}
									className="self-center"
									value={value}
									onChangeText={onChange}
								/>
							)}
						/>
						{errors.currentPassword && (
							<Text className="text-red-500">{errors.currentPassword.message}</Text>
						)}
					</View>
					<View className="gap-1">
						<Text>New password</Text>
						<Controller
							control={control}
							name="newPassword"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder="Type your new password"
									IconLeft={'lock'}
									IconRight={hideNewPassword ? 'eye-off' : 'eye'}
									iconPress={() => setHideNewPassword(!hideNewPassword)}
									secureTextEntry={hideNewPassword}
									className="self-center"
									value={value}
									onChangeText={onChange}
								/>
							)}
						/>
						{errors.newPassword && (
							<Text className="text-red-500">{errors.newPassword.message}</Text>
						)}
					</View>
					<View className="gap-1">
						<Text>Confirm new password</Text>
						<Controller
							control={control}
							name="confirmPassword"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder="Confirm your new password"
									IconLeft={'lock'}
									IconRight={hideConfirmPassword ? 'eye-off' : 'eye'}
									iconPress={() => setHideConfirmPassword(!hideConfirmPassword)}
									secureTextEntry={hideConfirmPassword}
									className="self-center"
									onChangeText={onChange}
									value={value}
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
						<Image source={require('@/assets/fingerprint-icon.png')} className="h-12 w-12" />
						<View className="flex-1">
							<Text className="font-inter-medium">Facial recognition</Text>
							<Text className="font-inter text-gray-500">Use your face to log in</Text>
						</View>
						<View className="p-2">
							<ToggleButton />
						</View>
					</View>
				</Card.Footer>
			</Card>
			<View>
				<Button className="flex-1" onPress={handleSubmit(onSubmit)}>
					<Text className="font-inter-medium text-xl text-neutral-100">Save changes</Text>
				</Button>
			</View>
			<Card className="gap-5">
				<Card.Header>
					<Text className="font-inter-bold text-xl">Security tips</Text>
				</Card.Header>
				<Card.Body>
					<Text className="font-inter text-gray-500">
						{'\u2022'} Use a strong and unique password
					</Text>
					<Text className="font-inter text-gray-500">
						{'\u2022'} Never share your login details
					</Text>
					<Text className="font-inter text-gray-500">
						{'\u2022'} Enable biometric authentication
					</Text>
					<Text className="font-inter text-gray-500">
						{'\u2022'} Update your password regularly
					</Text>
				</Card.Body>
			</Card>
		</View>
	)
}
