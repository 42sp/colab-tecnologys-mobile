import { Text, View } from 'react-native'
import { Task } from '@/api/get-tasks'
import { AlertTriangle } from 'lucide-react-native'

export function ActivityCardContentHeader({ task }: { task: Task }) {

	const produtivity = () => Math.floor(Math.random() * 7) * 10 + 40
	const prouctivity_value = produtivity()

	return (
		<View className="mb-6 flex-row items-start justify-around">
			<Text className="flex-1 text-left text-base font-semibold">
				{task.service_type} - {task.service_stage}
			</Text>
			{prouctivity_value && prouctivity_value >= 50 && (
				<Text
					className={`mr-4 text-nowrap text-right text-xl font-bold ${
						prouctivity_value >= 80 ? 'text-green-600' : 'text-yellow-500'
					}`}
				>
					{prouctivity_value}%
				</Text>
			)}
			{prouctivity_value && prouctivity_value < 50 && (
				<View className="mr-4">
					<AlertTriangle size={24} fill="#ffcd00" />
				</View>
			)}
		</View>
	)
}
