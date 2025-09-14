import { View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { HomeFilterModal } from './filter-modal'
import { SummaryCard } from '@/screens/drawer/home/summary-card'
import { ActivityList } from '@/screens/drawer/home/activity-list'
import { HorizontalList } from '@/screens/drawer/home/horizontal-list'
import { activityMock, ActivityService } from '@/mock'
import { DateRangeType } from '@/components/ui/calendar'
import { handleFilterChange } from './utils'
import { getTasks } from '@/api/get-tasks'

export type StatusType = 'pending' | 'approved' | 'completed'

export interface FilterType {
	serviceType?: string
	status?: StatusType[]
	dateRange?: DateRangeType
}

export default function Home() {
	const [filter, setFilter] = useState<FilterType>({
		serviceType: 'Todos',
		status: [],
		dateRange: { start: null, end: null },
	})
	const [showFilter, setShowFilter] = useState(false)

	const activityDataList = handleFilterChange(filter, activityMock.data)

	// async function getAllTasks() {
	// 	const tasks = await getTasks()
	// 	console.log('task:', tasks)
	// }

	// useEffect(() => {
	// 	getAllTasks()
	// }, [])

	return (
		<SafeAreaView className="flex-1 gap-5 bg-[#F9FAFB] p-5">
			<View className="flex-row items-center gap-5">
				<View className="flex-1">
					<Input
						keyboardType="default"
						IconLeft="search"
						placeholder="Procurar tarefas"
						className="bg-white"
					/>
				</View>
				<TouchableOpacity
					className="rounded-lg bg-black p-3"
					onPress={() => (showFilter ? setShowFilter(false) : setShowFilter(true))}
					activeOpacity={0.7}
				>
					<Feather name="filter" size={24} color="#FFF" />
				</TouchableOpacity>
			</View>

			<HorizontalList
				options={[
					'Todos',
					'parede',
					'contrapiso',
					'pintura',
					'alvenaria',
					'revestimento',
					'eletrica',
				]}
				selected={filter.serviceType ? filter.serviceType : 'Todos'}
				onSelect={(value) => setFilter((prev) => ({ ...prev, serviceType: value }))}
			/>

			<ActivityList
				data={activityDataList.data}
				HeaderComponent={
					<View className="flex-row gap-3">
						<SummaryCard
							icon="clipboard"
							SumaryVariant="blue"
							value={activityDataList.amount}
							label="Atividades"
						/>
						<SummaryCard
							icon="clock"
							SumaryVariant="orange"
							value={activityDataList.pendding}
							label="Pendentes"
						/>
						<SummaryCard
							icon="bar-chart"
							SumaryVariant="green"
							value={activityDataList.percent + '%'}
							label="Produtividade"
						/>
					</View>
				}
			/>

			<HomeFilterModal
				isVisible={showFilter}
				onClose={() => setShowFilter(false)}
				filter={filter}
				setFilter={setFilter}
			/>
		</SafeAreaView>
	)
}
