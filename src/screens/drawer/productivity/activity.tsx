import { View } from 'react-native'
import { ActivityCard } from './activity-card'
import { useEffect, useState } from 'react'
import { Task } from '@/api/get-tasks'
import { useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'

export function Activity() {
	const [tasks, setTasks] = useState<Task[]>([])
	const tasksRedux = useSelector((state: RootState) => state.tasks.tasks)

	useEffect(() => {
		const reqGetTasks = async () => {
			const tasksWithDateObjects = tasksRedux.map((task) => ({
				...task,
				completion_date: task.completion_date ? new Date(task.completion_date) : undefined,
			}))
			setTasks(tasksWithDateObjects)
			console.log(tasks)
		}
		reqGetTasks()
	}, [])

	return (
		<View className="m-4">
			{(
				Object.entries(
					tasks.reduce(
						(acc: Record<string, Task[]>, task: Task) => {
							const dateKey = task.completion_date?.toISOString().split('T')[0]
							if (dateKey) {
								if (!acc[dateKey]) {
									acc[dateKey] = []
								}
								acc[dateKey].push(task)
							}
							return acc
						},
						{} as Record<string, Task[]>,
					),
				) as [string, Task[]][]
			).map(([date, dateTasks]) => (
				<ActivityCard key={date} date={date} dateTasks={dateTasks} />
			))}
		</View>
	)
}
