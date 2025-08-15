import { Text, View, TouchableOpacity, Modal } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { HomeFilterModal } from './filter-modal'
import { SummaryCard } from '@/screens/drawer/home/summary-card'
import { ActivityList } from '@/screens/drawer/home/activity-list'
import { HorizontalList } from '@/screens/drawer/home/horizontal-list'
import { activityMock } from '@/mock'

export type StatusType = 'pending' | 'approved' | 'completed'

export interface FilterType {
	serviceType?: string
	status?: StatusType[]
	dateRange?: {
		start: Date
		end: Date
	}
}

export default function Home() {
	const [showFilter, setShowFilter] = useState(false)
	const [Selected, setSelected] = useState('Todos')
	const options = ['Todos', 'Contrapiso', 'Revestimento', 'Pintura', 'Alvenaria']

	const [filter, setFilter] = useState<FilterType>()

	const dataList = activityMock.data

	return (
		<SafeAreaView className="flex-1 gap-5 bg-[#F9FAFB] p-5">
			<View className="flex-row items-center gap-5">
				<View className="flex-1">
					<Input
						keyboardType="default"
						IconLeft="search"
						placeholder="Search tasks"
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
				options={options}
				selected={Selected}
				onSelect={(value) => setSelected(value)}
			/>

			<HomeFilterModal
				isVisible={showFilter}
				onClose={() => setShowFilter(false)}
				filter={filter}
				setFilter={setFilter}
			/>

			<View className="flex-row gap-3">
				<SummaryCard icon="clipboard" SumaryVariant="blue" value="1000" label="Activities" />
				<SummaryCard icon="clock" SumaryVariant="orange" value="200" label="Pending" />
				<SummaryCard icon="bar-chart" SumaryVariant="green" value="75%" label="Productivity" />
			</View>

			<ActivityList
				data={[
					{
						title: 'Today',
						data: dataList.filter(({ time }) => time.getDate() === new Date().getDate()),
					},
					{
						title: 'Yesterday',
						data: dataList.filter(({ time }) => time.getDate() === new Date().getDate() - 1),
					},
					{
						title: 'Oldest',
						data: dataList,
					},
				]}
			/>
		</SafeAreaView>
	)
}
