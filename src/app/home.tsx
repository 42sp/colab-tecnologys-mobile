import { useRouter } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/ui/button'
import ProfileViewer from '@/components/ProfileViewer'
import { SummaryCard } from '@/components/home/summary-card'
import { HorizontalList } from '@/components/ui/horizontal-list'
import { useState } from 'react'
import { TableList } from '@/components/ui/table-list'
import { ActivityCard } from '@/components/ui/activity-card'

// Horizontal List
const options = ['Todos', 'Alvenaria', 'Contrapiso', 'Elétrica', 'Hidráulica', 'Acabamento', 'Pintura'];

// Table List
const numbers = ['1', '2', '3', '4', '5', '6', '7'];

// ------------------------------------------
// Activity Card
//type LocationType = 'unit' | 'building';

// interface LocationData {
//   title: string;
//   location: string;
//   locationType: LocationType;
//   employee: string;
//   time: Date;
// }

const mockData1 =
  {
    title: '2 paredes construídas',
	jobType: 'parede',
    location: 'Andar 3, Bloco B, Residencial Jardins',
    locationType: 'unidade',
    employee: 'Carlos Silva',
    time: new Date('2025-08-06T14:35:00'),
  }

const mockData2 =
  {
    title: 'Contrapiso',
	jobType: 'contrapiso',
    location: 'Andar 2, Bloco A, Residencial Jardins',
    locationType: 'unidade',
    employee: 'Pedro Oliveira',
    time: new Date('2025-08-06T12:22:00'),
  }

const mockData3 =
  {
    title: 'Pintura finalizada',
	jobType: 'pintura',
    location: 'Andar 1, Bloco c, Residencial Jardins',
    locationType: 'predio',
    employee: 'Marcos Santos',
    time: new Date('2025-08-06T14:35:00'),
  }

// const mockData: LocationData[] = [
//   {
//     title: "2 Paredes Construídas",
//     location: "Andar 3, Bloco B, Residencial Jardins",
//     locationType: "unit",
//     employee: "Carlos Silva",
//     time: new Date('2025-08-06T08:00:00'),
//   },
//   {
//     title: "Contrapiso",
//     location: "Andar 2, Bloco A, Residencial Jardins",
//     locationType: "unit",
//     employee: "Pedro Oliveira",
//     time: new Date('2025-08-06T14:30:00'),
//   },
//   {
//     title: "Projeto Atualizado",
//     location: "Bloco D, Residencial Jardins",
//     locationType: "building",
//     employee: "Ana Rodrigues",
//     time: new Date('2025-08-06T18:45:00'),
//   },
// ]
// ------------------------------------------

export default function Home() {
	const router = useRouter()
	const [selected, onSelect] = useState(options[0])

	return (
		<SafeAreaProvider>
			<ScrollView>
			<SafeAreaView className="w-full bg-white p-10">
				<Text className="flex self-center text-xl">Home</Text>
				<View className="h-full items-center justify-center gap-2">
					<View className="w-full gap-2">
						<ActivityCard data={mockData1}/>
						<ActivityCard data={mockData2}/>
						<ActivityCard data={mockData3}/>
					</View>

					<ProfileViewer />

					<View className='w-full'>
						<HorizontalList 
							options={options}
							selected={selected}
							onSelect={onSelect}
						/>
					</View>

					<View className='flex-row my-4 gap-2'>
						<TableList 
							options={numbers}
							onChange={(newOptions) => console.log(newOptions)}
							title={
    						<Button title="tabela: " variant="outline" />
  							}
						/>
					</View>

					<View className="my-4 flex-row gap-4">
						<SummaryCard
							icon="clipboard"
							SumaryVariant="blue"
							value="1000"
							label="Atividades"
						/>

						<SummaryCard
							icon="clock"
							SumaryVariant="orange"
							value="200"
							label="Pendentes"
						/>

						<SummaryCard
							icon="bar-chart"
							SumaryVariant="green"
							value="75%"
							label="Produtividade"
						/>
					</View>


					<Button title="Go to Sign-in" onPress={() => router.navigate('/sign-in')} />
					<Button title="View Profile" variant='outline' onPress={() => router.navigate('main/profile')} />
				</View>
			</SafeAreaView>
			</ScrollView>
		</SafeAreaProvider>
	)
}
