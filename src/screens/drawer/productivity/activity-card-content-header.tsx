import { Text, View } from 'react-native'
import { Task } from '@/api/get-tasks'
import { AlertTriangle } from 'lucide-react-native'

export function ActivityCardContentHeader({ task }: { task: Task }) {
	return (
		<View className="mb-6 flex-row items-start justify-around">
			<Text className="flex-1 text-left text-base font-semibold">
				{task.service_type} - {task.service_stage}
			</Text>
			{task.task_percentage && task.task_percentage >= 50 && (
				<Text
					className={`mr-4 text-nowrap text-right text-xl font-bold ${
						task.task_percentage >= 80 ? 'text-green-600' : 'text-yellow-500'
					}`}
				>
					{task.task_percentage}%
				</Text>
			)}
			{task.task_percentage && task.task_percentage < 50 && (
				<View className="mr-4">
					<AlertTriangle size={24} fill="#ffcd00" />
				</View>
			)}
		</View>
	)
}
