import { View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { useCallback, useState } from 'react'
import { HomeFilterModal } from './filter-modal'
import { SummaryCard } from '@/screens/drawer/home/summary-card'
import { ActivityList } from '@/screens/drawer/home/activity-list'
import { HorizontalList } from '@/screens/drawer/home/horizontal-list'
import { DateRangeType } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from '@/_layouts/drawer/drawer'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { handleFilterChange } from './utils'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import { HomeSearch } from './home-search'
import { getTasks, Task } from '@/api/get-tasks'
import { setTasks } from '@/libs/redux/tasks/tasks-slice'
import { LoadingModal } from '@/components/ui/loading-modal'
import { HomeSkeleton } from './home-skeleton'

export type StatusTypes = 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected'

export interface FilterType {
	serviceType?: string
	status?: StatusTypes[]
	dateRange?: DateRangeType
	searchTerm?: { type: keyof Task; value: string }
}

type ProfileScreenNavigationProp = DrawerNavigationProp<DrawerParamList>

export default function Home() {
	const navigation = useNavigation<ProfileScreenNavigationProp>()
	const dispatch = useDispatch()

	const [filter, setFilter] = useState<FilterType>({
		serviceType: 'Todos',
		dateRange: { start: null, end: null },
	})
	const [showFilter, setShowFilter] = useState(false)

	const tasks = useSelector((state: RootState) => state.tasks.tasks)
	const activityDataList = handleFilterChange(filter, tasks)
	const [isLoading, setIsLoading] = useState(true)

	useFocusEffect(
		useCallback(() => {
			const fetchTasks = async () => {
				setIsLoading(true)
				try {
					const fetchedTasks = await getTasks()
					dispatch(setTasks(fetchedTasks))
				} catch (error) {
					console.error('Erro ao buscar tarefas:', error)
				} finally {
					setIsLoading(false)
				}
			}
			fetchTasks()

			return () => {
				console.log('MyScreen is no longer focused!')
			}
		}, []),
	)

	return (
		<SafeAreaView className="flex-1 gap-5 bg-[#F9FAFB] px-5 pt-5" edges={['bottom']}>
			<View className="flex-row gap-5">
				<HomeSearch
					tasksList={tasks}
					onSearch={(search) => setFilter({ ...filter, searchTerm: search })}
				/>

				<TouchableOpacity
					className="size-14 items-center justify-center rounded-lg bg-black p-3"
					onPress={() => (showFilter ? setShowFilter(false) : setShowFilter(true))}
					activeOpacity={0.7}
				>
					<MaterialIcons name="filter-list" size={24} color="#FFF" />
				</TouchableOpacity>
			</View>

			{isLoading ? (
				<>
					<HomeSkeleton />
					<LoadingModal visible={isLoading} />
				</>
			) : (
				<>
					<HorizontalList
						options={[
							'Todos',
							...new Set(tasks.map((item) => (item.service_type ? item.service_type : ''))),
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
								{filter.serviceType !== 'Todos' && (
									<TouchableOpacity onPress={() => navigation.navigate('productivity')}>
										<SummaryCard
											icon="bar-chart"
											SumaryVariant="green"
											value={activityDataList.percent + '%'}
											label="Produtividade"
										/>
									</TouchableOpacity>
								)}
							</View>
						}
					/>
				</>
			)}
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
