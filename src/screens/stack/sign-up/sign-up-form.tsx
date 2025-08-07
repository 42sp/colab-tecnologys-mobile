import { Text, View } from 'react-native'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Dropdown } from '@/components/ui/dropdown'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useNavigate } from '@/libs/react-navigation/useNavigate'

const items = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }, { label: 'Item 4' }]

const signUpSchema = z
	.object({
		name: z.string().nonempty('Full name is required'),
		email: z.email('Invalid e-mail'),
		cpf: z.string().nonempty().min(11, 'CPF must have at least 11 digits'),
		phone: z.string().nonempty('Phone number is required'),
		jobTitle: z.string().nonempty('Job title is required'),
		password: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

type SignUpType = z.infer<typeof signUpSchema>

export function SignUpForm() {
	const { stack } = useNavigate()

	const [hidePassword, setHidePassword] = useState(true)

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpType>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			jobTitle: '',
		},
	})

	function onSubmit(data: any) {
		console.log('Dados de Registro: ', JSON.stringify(data))
		stack('signIn')
	}

	return (
		<View className="h-full items-center justify-between gap-5 ">
			<View className="gap-1">
				<Text>Full name</Text>
				<Controller
					control={control}
					name="name"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="Type your full name"
							IconLeft={'user'}
							className="self-center"
							onChangeText={onChange}
							value={value}
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
							placeholder="your-email@email.com"
							IconLeft={'mail'}
							className="self-center"
							onChangeText={onChange}
							value={value}
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
							IconLeft={'file'}
							className="self-center"
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				{errors.cpf && <Text className="text-red-500">{errors.cpf.message}</Text>}
			</View>
			<View className="gap-1">
				<Text>Phone number</Text>
				<Controller
					control={control}
					name="phone"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="(00) 00000 0000"
							IconLeft={'phone'}
							className="self-center"
							onChangeText={onChange}
							value={value}
						/>
					)}
				/>
				{errors.phone && <Text className="text-red-500">{errors.phone.message}</Text>}
			</View>
			<View className="gap-1">
				<Text>Job title</Text>
				<Controller
					control={control}
					name="jobTitle"
					render={({ field: { onChange, value } }) => (
						<Dropdown
							IconLeft={'briefcase'}
							IconRight={'chevron-down'}
							className="self-center"
							options={items}
							variant="outline"
							placeholder="Select an option"
							value={value}
							onChangeText={onChange}
						/>
					)}
				/>
				{errors.jobTitle && <Text className="text-red-500">{errors.jobTitle.message}</Text>}
			</View>
			<View className="gap-1">
				<Text>Password</Text>
				<Controller
					control={control}
					name="password"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="Type your password"
							IconLeft={'lock'}
							IconRight={hidePassword ? 'eye' : 'eye-off'}
							iconPress={() => setHidePassword(!hidePassword)}
							secureTextEntry={hidePassword}
							className="self-center"
							value={value}
							onChangeText={onChange}
						/>
					)}
				/>
				{errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
			</View>
			<View className="gap-1">
				<Text>Confirm password</Text>
				<Controller
					control={control}
					name="confirmPassword"
					render={({ field: { onChange, value } }) => (
						<Input
							placeholder="Confirm your password"
							IconLeft={'lock'}
							IconRight={hidePassword ? 'eye' : 'eye-off'}
							iconPress={() => setHidePassword(!hidePassword)}
							secureTextEntry={hidePassword}
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

			<Button title="Create account" onPress={handleSubmit(onSubmit)} className="my-5" />
			<View className="py-5">
				<Text>
					Already have an account?
					<Text
						onPress={() => {
							stack('signUp')
						}}
						className="font-inter-bold text-blue-500"
					>
						{' '}
						Sign in
					</Text>
				</Text>
			</View>
		</View>
	)
}
