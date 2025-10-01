import { View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { useCallback, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { HomeFilterModal } from './filter-modal'
import { SummaryCard } from '@/screens/drawer/home/summary-card'
import { ActivityList } from '@/screens/drawer/home/activity-list'
import { HorizontalList } from '@/screens/drawer/home/horizontal-list'
import { DateRangeType } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from '@/_layouts/drawer/drawer'
import { useNavigation } from '@react-navigation/native'
import { handleFilterChange } from './utils'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

import { HomeSkeleton } from './home-skeleton'

import { RootState } from '@/libs/redux/store'
import { ItemType } from '@/components/ui/dropdown'
import { setTasks } from '@/libs/redux/tasks/tasks-slice'
import { getTasks } from '@/api/get-tasks'
import { LoadingModal } from '@/components/ui/loading-modal'

export type StatusTypes = 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected'

export interface FilterType {
	serviceType?: string
	status?: StatusTypes[]
	dateRange?: DateRangeType
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
	// const [inputText, setInputText] = useState('')
	// const [inputTextListFilter, setTextListFilter] = useState<ItemType[]>([])

	const tasks = useSelector((state: RootState) => state.tasks.tasks)
	const activityDataList = handleFilterChange(filter, tasks)

	const [isLoading, setIsLoading] = useState(true)

	useFocusEffect(
		useCallback(() => {
			// This function will be called when the screen comes into focus.
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

			// You can return a cleanup function here.
			// This function will be called when the screen goes out of focus,
			// or when the component unmounts.
			return () => {
				console.log('MyScreen is no longer focused!')
			}
		}, []), // The dependency array ensures the effect runs only once or when dependencies change.
	)

	// useEffect(() => {
	// 	console.log('text: ', inputText)
	// 	const list: ItemType[] = Array.from(
	// 		new Set(
	// 			tasks
	// 				.filter(
	// 					(item) =>
	// 						!!item.worker_name &&
	// 						item.worker_name.toLowerCase().includes(inputText.toLowerCase()),
	// 				)
	// 				.map((item) => item.worker_name as string),
	// 		),
	// 	).map((name) => ({
	// 		label: name,
	// 	}))
	// 	setTextListFilter(list)
	// 	console.log(list)
	// }, [inputText])

	return (
		<SafeAreaView className="flex-1 gap-5 bg-[#F9FAFB] px-5 pt-5" edges={['bottom']}>
			<View className="flex-row items-center gap-5">
				<View className="flex-1">
					<Input
						keyboardType="default"
						IconLeft="search"
						placeholder="Procurar tarefas"
						className="bg-white"
						// onChangeText={(value) => setInputText(value)}
					/>
					{/* <TextDropdown
						// IconLeft={'briefcase'}
						// IconRight={'chevron-down'}
						options={inputTextListFilter}
						placeholder="Selecione uma opção"
						onChangeText={() => {
							console.log('sei lá')
						}}
					/> */}
				</View>
				<TouchableOpacity
					className="rounded-lg bg-black p-3"
					onPress={() => (showFilter ? setShowFilter(false) : setShowFilter(true))}
					activeOpacity={0.7}
				>
					<MaterialIcons name="filter-list" size={24} color="#FFF" />
				</TouchableOpacity>
			</View>

			{isLoading ? (
				<>
					<HomeSkeleton />
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
