import { View } from 'react-native'
import { ActivityCard } from './activity-card'
import { Task } from '@/api/get-tasks'

interface ActivityProps {
	tasks?: Task[]
}

export function Activity({ tasks }: ActivityProps) {
	return (
		<View className="m-4">
			{(tasks &&
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
				).map(([date, dateTasks]) => (
					<ActivityCard key={date} date={date} dateTasks={dateTasks} />
				))) ||
				null}
		</View>
	)
}
