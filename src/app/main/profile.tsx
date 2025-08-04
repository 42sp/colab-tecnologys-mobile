import { ProfileAvatar } from '@/components/profile/profile-avatar'
import Card from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
	return (
		<SafeAreaProvider>
			<SafeAreaView className="flex-1 bg-[#F9FAFB] p-5">
				<ProfileAvatar avatar="" name={'João Silva'} email={'joaosilva@gmail.com'} />

				<Card className="">
					<View className=""></View>
					<Input />
					<Card.Header>
						<Text className="font-inter-bold text-lg">Título do Card</Text>
					</Card.Header>
					<Card.Body className="">
						<Text>Conteúdo principal do card aqui</Text>
					</Card.Body>
				</Card>
			</SafeAreaView>
		</SafeAreaProvider>
	)
}
