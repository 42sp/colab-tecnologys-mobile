import Card from '@/components/ui/card'
import { Text } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
	return (
		<SafeAreaProvider>
			<SafeAreaView className=" p-5">
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
