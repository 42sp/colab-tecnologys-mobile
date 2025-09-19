import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EditProfileAvatar } from './edit-profile-avatar'
import { EditProfileForm } from './edit-profile-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function EditProfileScreen() {
	return (
		<SafeAreaView className="bg-[#F9FAFB] ">
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="gap-4">
						<EditProfileAvatar avatar={require('@/assets/default-avatar.png')} />
						<EditProfileForm />
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
