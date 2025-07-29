import { SafeAreaView, Image, Text, View, TouchableOpacity } from 'react-native'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPassword() {
	return (
		<SafeAreaView className="flex-1 bg-white p-10">
			<Image
				source={require('@/assets/tecnologys-logo.png')}
				className="mb-5 mt-10 h-28 w-40 self-center"
				resizeMode="contain"
				alt="Tecnologys Logo"
			/>

			<View className="mt-5 items-center justify-center gap-2">
				<Text className="text-center font-inter-bold text-3xl">Forgot Password</Text>

				<Text className="text-center font-inter text-lg text-neutral-500">
					Enter your email address to reset your password
				</Text>
			</View>

			<View className="mt-10">
				<Input
					placeholder="Email address"
					IconLeft="mail"
					className="self-center"
					keyboardType="email-address"
					autoCapitalize="none"
					autoComplete="email"
				/>

				<Text className="mt-4 text-center font-inter text-sm leading-5 text-neutral-500">
					We&#39;ll send you a link to reset your password
				</Text>

				<Button
					title="Reset Password"
					onPress={() => console.log('Reset Password Pressed')}
					variant="default"
					className="mt-8"
				/>

				<TouchableOpacity
					className="mt-6 self-center"
					onPress={() => console.log('Back to Sign In Pressed')}
				>
					<Text className="text-center font-inter-medium text-base leading-6 text-blue-600">
						Back to Sign In
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	)
}
