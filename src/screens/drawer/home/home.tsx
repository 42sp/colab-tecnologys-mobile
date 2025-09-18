import { View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { HomeFilterModal } from './filter-modal'
import { SummaryCard } from '@/screens/drawer/home/summary-card'
import { ActivityList } from '@/screens/drawer/home/activity-list'
import { HorizontalList } from '@/screens/drawer/home/horizontal-list'
import { activityMock, ActivityService } from '@/mock'
import { DateRangeType } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from '@/_layouts/drawer/drawer'
import { useNavigation } from '@react-navigation/native'

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
	const dataList = activityMock.data

	function handleFilterChange(filter: FilterType | undefined, dataList: ActivityService[]) {
		const yesterday = new Date()
		yesterday.setDate(yesterday.getDate() - 1)

		if (
			!filter ||
			(filter.status?.length === 0 && !filter.dateRange?.start && filter.serviceType === 'Todos')
		) {
			return {
				amount: dataList.length,
				percent: Math.round(
					(dataList.filter(({ status }) => status === 'completed').length / dataList.length) * 100,
				),
				pendding: dataList.filter(({ status }) => status === 'pending').length,
				data: [
					{
						title: 'Hoje',
						data: dataList.filter(
							({ time }) => time.toLocaleDateString() === new Date().toLocaleDateString(),
						),
					},
					{
						title: 'Ontem',
						data: dataList.filter(
							({ time }) => time.toLocaleDateString() === yesterday.toLocaleDateString(),
						),
					},
					{
						title: 'Anteriores',
						data: dataList.filter(({ time }) => time < yesterday),
					},
				],
			}
		} else {
			let filteredData = dataList

			if (filter.status?.length) {
				filteredData = filteredData.filter(({ status }) => filter.status?.includes(status!))
			}

			if (filter.dateRange?.start && filter.dateRange?.end) {
				filteredData = filteredData.filter(({ time }) => {
					return time >= filter.dateRange?.start! && time <= filter.dateRange?.end!
				})
			}

			if (filter.serviceType && filter.serviceType !== 'Todos') {
				filteredData = filteredData.filter(({ serviceType }) => serviceType === filter.serviceType)
			}

			return {
				amount: filteredData.length,
				percent:
					Math.round(
						(filteredData.filter(({ status }) => status === 'completed').length /
							filteredData.length) *
							100,
					) || 0,
				pendding: filteredData.filter(({ status }) => status === 'pending').length,
				data: [
					{
						title: 'Filtered Results',
						data: filteredData,
					},
				],
			}
		}
	}

	const activityDataList = handleFilterChange(filter, dataList)
	type ProfileScreenNavigationProp = DrawerNavigationProp<DrawerParamList>
	const navigation = useNavigation<ProfileScreenNavigationProp>()

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
					<MaterialIcons name="filter-list" size={24} color="#FFF" />
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
						<TouchableOpacity onPress={() => navigation.navigate('productivity')}>
							<SummaryCard
								icon="bar-chart"
								SumaryVariant="green"
								value={activityDataList.percent + '%'}
								label="Produtividade"
							/>
						</TouchableOpacity>
					</View>
				}
			/>
			<Button
				variant="rounded"
				onPress={() => navigation.navigate('registerService')}
				className="absolute bottom-16 right-5 size-16"
			>
				<Feather name="plus" size={32} color="#FFFFFF" />
			</Button>

			<HomeFilterModal
				isVisible={showFilter}
				onClose={() => setShowFilter(false)}
				filter={filter}
				setFilter={setFilter}
			/>
		</SafeAreaView>
	)
}
