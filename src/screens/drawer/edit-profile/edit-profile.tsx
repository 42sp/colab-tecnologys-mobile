import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EditProfileAvatar } from './edit-profile-avatar'
import { EditProfileForm } from './edit-profile-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function EditProfileScreen() {
	return (
		<SafeAreaView className="bg-[#F9FAFB] py-5 " edges={['bottom']}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="">
						<EditProfileAvatar avatar={require('@/assets/default-avatar.png')} />
						<EditProfileForm />
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
