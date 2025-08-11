import { ActivityList } from '@/components/ui/activity-list'
import { ActivityCard } from '@/components/ui/activity-card'
import { Button } from '@/components/ui/button'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

interface ActivityData {
	id: string
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
		id: '01',
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-07T10:15:00'),
		id: '02',
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-07T14:00:00'),
		id: '03',
	},
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-07T09:30:00'),
		id: '04',
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-08T11:00:00'),
		id: '05',
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-08T16:45:00'),
		id: '06',
	},
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-08T18:45:00'),
		id: '07',
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-09T16:45:00'),
		id: '08',
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-09T10:09:00'),
		id: '09',
	},
	{
		title: '2 paredes construídas',
		jobType: 'parede',
		location: 'Andar 3, Bloco B, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Carlos Silva',
		time: new Date('2025-08-09T14:35:00'),
		id: '10',
	},
	{
		title: 'Contrapiso',
		jobType: 'contrapiso',
		location: 'Andar 2, Bloco A, Residencial Jardins',
		locationType: 'unidade',
		employee: 'Pedro Oliveira',
		time: new Date('2025-08-10T12:22:00'),
		id: '11',
	},
	{
		title: 'Pintura finalizada',
		jobType: 'pintura',
		location: 'Andar 1, Bloco c, Residencial Jardins',
		locationType: 'predio',
		employee: 'Marcos Santos',
		time: new Date('2025-08-10T09:35:00'),
		id: '12',
	},
]

export default function HomeManagerScreen() {
	return (
		<SafeAreaView className=" w-full flex-1 gap-4 bg-[#F9FAFB] p-5 ">
			<View>
				<Button title="Adicionar Atividade" />
			</View>
			<View>
				<ActivityCard
					data={{
						title: 'Pintura finalizada',
						jobType: 'pintura',
						location: 'Andar 1, Bloco c, Residencial Jardins',
						locationType: 'predio',
						employee: 'Marcos Santos',
						time: new Date('2025-08-10T09:35:00'),
					}}
				/>
			</View>
			<View className="flex-1">
				{/* <View className="h-20 bg-pink-300"></View> */}

				<ActivityList
					className=""
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
		</SafeAreaView>
	)
}
