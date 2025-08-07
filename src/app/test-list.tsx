import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/ui/button'
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
		time: new Date('2025-08-06T14:35:00'),
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-06T12:22:00'),
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-06T14:35:00'),
	},
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-06T14:35:00'),
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-06T12:22:00'),
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-06T14:35:00'),
	},
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-06T14:35:00'),
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-06T12:22:00'),
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-06T14:35:00'),
	},
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-06T14:35:00'),
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-06T12:22:00'),
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-06T14:35:00'),
	},
]

export default function TestList() {
	const router = useRouter()

	return (
		<SafeAreaProvider>
			{/* mudei do padrão p-10 para p-5 apenas pq fica mais parecido com o design original */}
			<SafeAreaView className="w-full p-5">
				<Text className="text-2xl">test list</Text>
				<View className="items-center gap-2 ">
					<Button title="home" onPress={() => router.navigate('/home')} />
					<View className="">
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
		</SafeAreaProvider>
	)
}
