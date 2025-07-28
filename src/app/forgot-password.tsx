import { SafeAreaView, Image, Text, View, TouchableOpacity } from 'react-native'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ForgotPassword() {
	return (
		<SafeAreaView className='flex-1 bg-white p-10'>

			<Image
				source={require('@/assets/tecnologys-logo.png')}
				className='w-40 h-28 self-center mt-10 mb-5'
				resizeMode='contain'
				alt='Tecnologys Logo'
			/>

			<View className='mt-5 gap-2 items-center justify-center'>
				<Text className='font-inter-bold text-3xl text-center'>
					Forgot Password
				</Text>

				<Text className="font-inter text-lg text-neutral-500 text-center">
					Enter your email address to reset your password
				</Text>
			</View>

			<View className='mt-10'>
				<Input
					placeholder="Email address"
					IconLeft="mail"
					className="self-center"
					keyboardType="email-address"
					autoCapitalize="none"
					autoComplete="email"
				/>

				<Text className="text-center font-inter text-sm text-neutral-500 leading-5 mt-4">
					We&#39;ll send you a link to reset your password
				</Text>

				<Button
					title='Reset Password'
					onPress={() => console.log('Reset Password Pressed')}
					variant='default'
					className='mt-8'
				/>

				<TouchableOpacity className='mt-6 self-center' onPress={() => console.log('Back to Sign In Pressed')}>
					<Text className="text-blue-600 font-inter-medium text-base leading-6 text-center">
						Back to Sign In
					</Text>
				</TouchableOpacity>
			</View>

		</SafeAreaView>
	)
}
