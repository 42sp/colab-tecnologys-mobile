import { ProfileAvatar } from '@/components/profile/profile-avatar'
import Card from '@/components/ui/card'
import { Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
	return (
		<SafeAreaProvider>
			<SafeAreaView className="flex-1 bg-[#F9FAFB] p-5">
				<ProfileAvatar avatar="" name={'João Silva'} email={'joaosilva@gmail.com'} />
				<Text className="flex self-center text-xl">Profile</Text>
				<Card>
					<Card.Header>
						<Text className="font-inter-bold text-lg">Título do Card</Text>
					</Card.Header>
					<Card.Body>
						<Text>Conteúdo principal do card aqui</Text>
					</Card.Body>
					<Card.Footer>
						<Text>Rodapé do card</Text>
					</Card.Footer>
				</Card>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
