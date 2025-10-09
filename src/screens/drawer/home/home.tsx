import { View, TouchableOpacity, InteractionManager, Animated, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather, MaterialIcons } from '@expo/vector-icons'
import { startTransition, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
import { HomeSkeleton } from './home-skeleton'
import { useDeferredFocusEffect } from '@/hook/useDeferredFocusEffect'

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
	const activityDataList: any = handleFilterChange(filter, tasks)
	const [isLoading, setIsLoading] = useState(true)
	const overlayOpacity = useRef(new Animated.Value(0)).current
	const [isRefreshing, setRefreshing] = useState(false)
	const [refetching, setRefetching] = useState(false)

	const hasInitialDataRef = useRef(false)
	useEffect(() => {
		if (tasks && tasks.length) hasInitialDataRef.current = true
	}, [tasks])

	useEffect(() => {
		Animated.timing(overlayOpacity, {
			toValue: isLoading ? 1 : 0,
			duration: 180,
			useNativeDriver: true,
		}).start()
	}, [isLoading, overlayOpacity])

	// 1) Carregamento inicial (mantém lista montada; skeleton só por cima)
	useEffect(() => {
		let alive = true
		const controller = new AbortController()
		;(async () => {
			try {
				const fetchedTasks = await getTasks(controller.signal)

				if (!alive) return
				// startTransition deixa a UI respirar mesmo com muitos itens
				startTransition(() => dispatch(setTasks(fetchedTasks) as any))
			} finally {
				if (alive) setIsLoading(false)
			}
		})()
		return () => {
			alive = false
			controller.abort()
		}
	}, [])

	// 2) Pull-to-refresh (mantém lista visível)
	const onRefresh = async () => {
		console.log('refresh')
		setRefreshing(true)
		const controller = new AbortController()
		try {
			const fetchedTasks = await getTasks(controller.signal)
			console.log('refreshed')
			startTransition(() => dispatch(setTasks(fetchedTasks) as any))
		} finally {
			setRefreshing(false)
			controller.abort()
		}
	}

	// 3) Refetch ao focar (opcional) sem desmontar nada
	useDeferredFocusEffect(async ({ isActive, signal }) => {
		if (!hasInitialDataRef.current) return
		setRefetching(true)
		try {
			const fetchedTasks = await getTasks(signal)
			if (isActive()) startTransition(() => dispatch(setTasks(fetchedTasks) as any))
		} finally {
			if (isActive()) setRefetching(false)
		}
	}, [])

	return (
		<SafeAreaView className="flex-1 gap-2 bg-[#F9FAFB] px-5 pt-5" edges={['bottom']}>
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
						<View className="flex-row gap-2">
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
					firstLoad={isLoading} // true só no primeiro load
					refreshing={isRefreshing} // spinner nativo
					onRefresh={onRefresh} // pull-to-refresh
					//refetching={isRefetchingLight} // overlay leve (opcional)
				/>

				<Animated.View
					pointerEvents={isLoading ? 'auto' : 'none'}
					style={[StyleSheet.absoluteFillObject, { opacity: overlayOpacity, top: 70 }]}
				>
					<HomeSkeleton />
				</Animated.View>

				{/*<ActivityList
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
					/>*/}
			</>

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
