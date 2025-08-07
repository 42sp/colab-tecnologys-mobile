import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/ui/button'
import { useNavigate } from '@/libs/react-navigation/useNavigate'
import { ActivityList } from '@/components/ui/activity-list'

interface ActivityData {
	title: string
	jobType: string
	location: string
	locationType: string
	employee: string
	time: Date
}

const mockData: ActivityData[] = [
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-06T16:42:00'),
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-07T10:15:00'),
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-07T14:00:00'),
	},
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-07T09:30:00'),
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-08T11:00:00'),
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-08T16:45:00'),
	},
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-08T18:45:00'),
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-09T16:45:00'),
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-09T10:09:00'),
	},
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-09T14:35:00'),
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-10T12:22:00'),
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-10T09:35:00'),
	},
]

export default function HomeScreen() {
	const { stack, drawer } = useNavigate()

	return (
		<SafeAreaView className="w-full p-10">
			<Text className="flex self-center text-xl">Home</Text>
			<View className="h-full items-center justify-center gap-4">				
				<Button
					title="View Profile"
					onPress={() => {
						drawer('profile')
					}}
				/>

				<Button title="Forgot password" onPress={() => stack('forgotPassword')} variant="red" />

				<Button title="Go to Sign-in" onPress={() => stack('signIn')} />
				
				{/* necessário mandar a percentagem de altura relativo aos componentes da página */}
				<View className="h-[60%]">
						<ActivityList
							data={[
								{
									title: '',
									data: mockData.map((item) => ({
										...item,
											jobType: item.jobType as any,
									})),
								},
							]}
						/>
					</View>
			</View>
		</SafeAreaView>
	)
}
