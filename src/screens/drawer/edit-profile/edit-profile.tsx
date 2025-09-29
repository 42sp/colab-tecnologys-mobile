import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EditProfileAvatar } from './edit-profile-avatar'
import { EditProfileForm } from './edit-profile-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function EditProfileScreen() {
	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<SafeAreaView className="bg-[#F9FAFB]" edges={['bottom']}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="flex-1 py-10">
						<EditProfileAvatar avatar={require('@/assets/default-avatar.png')} />
						<EditProfileForm />
					</View>
				</ScrollView>
			</SafeAreaView>
		</KeyboardAvoidingView>
	)
}
