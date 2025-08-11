import { KeyboardAvoidingView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { EditProfileAvatar } from './edit-profile-avatar'
import { EditProfileForm } from './edit-profile-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function EditProfileScreen() {
	return (
		<SafeAreaView className="bg-[#F9FAFB]">
			<KeyboardAvoidingView behavior={'height'}>
				<ScrollView showsVerticalScrollIndicator={false}>
					<View className="gap-4">
						<EditProfileAvatar avatar="https://randomuser.me/portraits/men/1.jpg" />
						<EditProfileForm />
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
