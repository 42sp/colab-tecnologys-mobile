import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { EditProfileAvatar } from './edit-profile-avatar'
import { EditProfileForm } from './edit-profile-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function EditProfileScreen() {
	return (
		<SafeAreaProvider>
			<SafeAreaView className="bg-[#F9FAFB] ">
				<KeyboardAvoidingView behavior={'height'}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<EditProfileAvatar />
						<EditProfileForm />
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
