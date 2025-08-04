import { KeyboardAvoidingView } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Avatar } from '@/components/edit-profile/avatar'
import { EditProfileForm } from '@/components/edit-profile/edit-profile-form'
import { ScrollView } from 'react-native-gesture-handler'

export default function Home() {
	return (
		<SafeAreaProvider>
			<SafeAreaView className="bg-white">
				<KeyboardAvoidingView behavior={'height'}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Avatar />
						<EditProfileForm />
					</ScrollView>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
