import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/ui/button'
import { ActivityList } from '@/components/ui/activity-list'
import { useNavigate } from '@/libs/react-navigation/useNavigate'

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

export default function TestListScreen() {

	const { stack } = useNavigate()
	return (
		<SafeAreaView className="w-full p-10">
				{/* mudei do padrão p-10 para p-5 apenas pq fica mais parecido com o design do motiff */}
				<Text className="text-2xl">test list</Text>
				<View className="items-center gap-2 ">
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
	)
}
