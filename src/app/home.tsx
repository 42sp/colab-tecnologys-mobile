import { useRouter } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Button } from '@/components/ui/button'
import ProfileViewer from '@/components/ProfileViewer'
import { SummaryCard } from '@/components/home/summary-card'
import { HorizontalList } from '@/components/ui/horizontal-list'
import { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { TableList } from '@/components/ui/table-list'

const options = ['Todos', 'Alvenaria', 'Contrapiso', 'Elétrica', 'Hidráulica', 'Acabamento', 'Pintura'];

const numbers = ['1', '2', '3', '4', '5', '6', '7'];

export default function Home() {
	const router = useRouter()
	const [selected, onSelect] = useState(options[0])

	return (
		<SafeAreaProvider>
			<ScrollView>
			<SafeAreaView className="w-full bg-white p-10">
				<Text className="flex self-center text-xl">Home</Text>
				<View className="h-full items-center justify-center gap-2">
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
