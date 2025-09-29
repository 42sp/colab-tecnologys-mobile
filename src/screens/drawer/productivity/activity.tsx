import { View } from 'react-native'
import { ActivityCard } from './activity-card'
import { Task } from '@/api/get-tasks'
import { useMemo } from 'react'
import { toDate } from '../home/utils'

interface ActivityProps {
	tasks?: Task[]
}

export function Activity({ tasks }: ActivityProps) {

	const tasksEntries = useMemo(() => {
		const tasksByDate = tasks?.reduce((acc: Record<string, Task[]>, task: Task) => {
				const dateKey = toDate(task.completion_date)?.toISOString().split('T')[0]
				if (dateKey) {
					if (!acc[dateKey]) {
						acc[dateKey] = []
					}
					acc[dateKey].push(task)
				}
				return acc
			},
			{} as Record<string, Task[]>,
		)
		const tasksEntries = Object.entries(tasksByDate ?? [])

		return tasksEntries.map(([date, dateTasks]: [string, Task[]]) => ([date, dateTasks.sort((a, b) => toDate(b.completion_date).getTime() - toDate(a.completion_date).getTime())])) as [string, Task[]][]
	}, [tasks])
	return (
		<View className="m-4">
			{tasksEntries.map(([date, dateTasks]) => (
					<ActivityCard key={date} date={dateTasks[0].completion_date?.toISOString()!} dateTasks={dateTasks} />
				))}
		</View>
	)
}
