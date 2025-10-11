import { View, Text } from 'react-native'
import { ActivityCard } from './activity-card'
import { TasksServices } from '@/api/get-tasks'
import { useMemo } from 'react'
import { toDate } from '../home/utils'

interface ActivityProps {
	tasks?: TasksServices[]
}

export function Activity({ tasks }: ActivityProps) {

	const tasksEntries = useMemo(() => {
		const tasksByDate = tasks?.reduce((acc: Record<string, TasksServices[]>, task: TasksServices) => {
				const dateKey = toDate(task.completion_date)?.toISOString().split("T")[0]
				if (dateKey) {
					if (!acc[dateKey]) {
						acc[dateKey] = []
					}
					acc[dateKey].push(task)
				}
				return acc
			},
			{} as Record<string, TasksServices[]>,
		)
		const tasksEntries = Object.entries(tasksByDate ?? []).sort((a, b) => toDate(a[0]).getTime() - toDate(b[0]).getTime())

		return tasksEntries.map(([date, dateTasks]: [string, TasksServices[]]) => ([date, dateTasks])) as [string, TasksServices[]][]
	}, [tasks])
	return (
		<View className="m-4">
			{tasksEntries.map(([date, dateTasks]) => (
					<ActivityCard key={date} date={dateTasks[0].completion_date?.toISOString()!} dateTasks={dateTasks} />
				))}
		</View>
	)
}
