import { Text, TouchableOpacity, View } from 'react-native'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useNavigate } from '@/libs/react-navigation/useNavigate'

const signInSchema = z.object({
	email: z.email('Please enter a valid email address').nonempty('Email is required'),
	password: z.string().nonempty('Password is required'),
})

type SignInType = z.infer<typeof signInSchema>

export function SignInForm() {
	const { stack } = useNavigate()

	const [hidePassword, setHidePassword] = useState(true)

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<SignInType>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(data: SignInType) {
		console.log('Dados do Login', JSON.stringify(data))
		await new Promise((resolve) => setTimeout(resolve, 1000))
	}

	return (
		<View className="my-5 gap-5">
			<Controller
				control={control}
				name="email"
				render={({ field: { onChange, onBlur, value } }) => (
					<View>
						<Input
							keyboardType="email-address"
							autoCapitalize="none"
							placeholder="Email address"
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							hasError={!!errors.email}
						/>
						{errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
					</View>
				)}
			/>

			<Controller
				control={control}
				name="password"
				render={({ field: { onChange, onBlur, value } }) => (
					<View>
						<Input
							placeholder="Password"
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
				<Text className="self-end font-inter-bold text-blue-500">Forgot Password</Text>
			</TouchableOpacity>

			<Button
				title="Sign In"
				onPress={handleSubmit(onSubmit)}
				disabled={isSubmitting}
			/>

			<View className=" items-center">
				<View className="flex-row">
					<Text className="font-inter">Don&rsquo;t have an account? </Text>
					<TouchableOpacity
						activeOpacity={0.5}
						onPress={() => {
							stack('signUp')
						}}
					>
						<Text className="font-inter-bold text-blue-500">Sign Up</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
}
