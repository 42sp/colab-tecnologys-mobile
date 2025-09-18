import { View } from 'react-native'
import { ActivityCardDate } from './activity-card-date'
import { ActivityCardContent } from './activity-card-content'
import { Task } from './activity'

interface ActivityCardProps {
	date: string
	dateTasks: Task[]
}

export function ActivityCard({ date, dateTasks }: ActivityCardProps) {
	return (
		<View className="mb-6 flex-row">
			<ActivityCardDate date={date} />
			<View className="flex-1">
				{dateTasks.map((task: Task) => (
					<ActivityCardContent key={task.id} task={task} />
				))}
			</View>
		</View>
	)
}
