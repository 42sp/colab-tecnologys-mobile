import { z } from 'zod'
import { useRouter } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
	Image,
	Text,
	View,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const forgotPasswordSchema = z.object({
	email: z.email('Invalid email address'),
})

type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>

export default function ForgotPassword() {
	const router = useRouter()

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<ForgotPasswordType>({
		resolver: zodResolver(forgotPasswordSchema),
	})

	async function onSubmit(data: ForgotPasswordType) {
		console.log('Email', JSON.stringify(data))
		await new Promise((resolve) => setTimeout(resolve, 1000))
	}

	return (
		<SafeAreaProvider>
			<SafeAreaView className="h-full bg-white p-10">
				<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Image source={require('@/assets/tecnologys-logo.png')} className="mb-5 self-center" />
						<View className="my-5 items-center">
							<Text className="font-inter-bold text-3xl">Forgot Password</Text>
							<Text className="mt-2 text-center font-inter text-lg text-neutral-500">
								Enter your email address to reset your password
							</Text>
						</View>

						<View className="mt-10">
							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, onBlur, value } }) => (
									<View>
										<Input
											keyboardType="email-address"
											autoCapitalize="none"
											IconLeft="mail"
											placeholder="Email address"
											onBlur={onBlur}
											onChangeText={onChange}
											value={value}
										/>
										{errors.email && (
											<Text className="mt-1 text-sm text-red-500 font-inter">
												{errors.email.message}
											</Text>
										)}
									</View>
								)}
							/>

							<Text className="mt-4 text-center font-inter text-sm leading-5 text-neutral-500">
								We&#39;ll send you a link to reset your password
							</Text>

							<Button className="mt-8" title="Reset Password" onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />

							<TouchableOpacity
								className="mt-6 self-center"
								activeOpacity={0.5}
								onPress={() => router.back()}
							>
								<Text className="text-center font-inter-bold text-base leading-6 text-blue-600">
									Back to Sign In
								</Text>
							</TouchableOpacity>
						</View>
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
