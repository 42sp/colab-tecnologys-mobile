import { ScrollView } from 'react-native'
import { useState } from 'react'
import { Task } from '@/api/get-tasks'
import { Header } from './header'
import { Search } from './search'
import { Calendar } from './calendar'
import { Activity } from './activity'
import { useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'

export default function Productivity() {
	const [searchTerm, setSearchTerm] = useState('')
	const tasksRedux = useSelector((state: RootState) => state.tasks.tasks)

	const tasksWithDateObjects = tasksRedux.map((task) => ({
		...task,
		completion_date: task.completion_date ? new Date(task.completion_date) : undefined,
	}))

	const filteredTasks =
		searchTerm.trim().length > 0
			? tasksWithDateObjects.filter((task: Task) =>
					task.worker_name?.toLowerCase().includes(searchTerm.toLowerCase()),
				)
			: tasksWithDateObjects

	const uniqueWorkers = Array.from(new Set(tasksWithDateObjects.map((t) => t.worker_name ?? '')))

	return (
		<>
			<Search workers={uniqueWorkers} onSearch={(name) => setSearchTerm(name)} />
			<ScrollView>
				<Header />
				<Calendar />
				<Activity tasks={filteredTasks} />
			</ScrollView>
		</>
	)
}
