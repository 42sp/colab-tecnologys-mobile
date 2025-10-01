import { ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { Task } from '@/api/get-tasks'
import { Header } from './header'
import { Search } from './search'
import { Calendar } from './calendar'
import { Activity } from './activity'
import { useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { format } from 'date-fns'
import { ProductivitySkeleton } from './productivity-skeleton'
import { LoadingModal } from '@/components/ui/loading-modal'

export default function Productivity() {
	const [searchTerm, setSearchTerm] = useState('')
	const [selectedDate, setSelectedDate] = useState<string | undefined>()
	const tasksRedux = useSelector((state: RootState) => state.tasks.tasks)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
    	const timer = setTimeout(() => setIsLoading(false), 2000)
    	return () => clearTimeout(timer)
  	}, [])
	
	const tasksWithDateObjects = tasksRedux.map((task) => ({
		...task,
		completion_date: task.completion_date ? new Date(task.completion_date) : undefined,
	}))

	const formatLocalDate = (d: Date) => format(d, 'yyyy-MM-dd')

	const filteredTasks = tasksWithDateObjects.filter((task: Task) => {
		const matchesWorker =
			searchTerm.trim().length > 0
				? task.worker_name?.toLowerCase().includes(searchTerm.toLowerCase())
				: true
		const matchesDate = selectedDate
			? Boolean(task.completion_date) &&
				formatLocalDate(task.completion_date as Date) === selectedDate
			: true
		return Boolean(matchesWorker && matchesDate)
	})

	const uniqueWorkers = Array.from(new Set(tasksWithDateObjects.map((t) => t.worker_name ?? '')))

	if (isLoading) {
		return (
		<>
			<ProductivitySkeleton />
			<LoadingModal visible={isLoading} />
    	</>
  		)
	}
	return (
		<>
			<Search workers={uniqueWorkers} onSearch={(name) => setSearchTerm(name)} />

			<ScrollView>
				<Header tasks={filteredTasks} />
				<View className="mt-4">
					<Calendar selectedDay={selectedDate} onDayPress={(d) => setSelectedDate(d)} />
					{selectedDate && (
						<View className="mt-2 flex-row justify-end">
							<TouchableOpacity
								onPress={() => setSelectedDate(undefined)}
								className="flex-row items-center gap-2 rounded-md bg-gray-100 px-3 py-2"
							>
								<Feather name="x" size={16} color="#374151" />
								<Text className="text-sm text-gray-700">Limpar data</Text>
							</TouchableOpacity>
						</View>
					)}
				</View>
				<Activity tasks={filteredTasks} />
			</ScrollView>
		</>
	)
}
