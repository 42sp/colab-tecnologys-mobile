import { Text, View } from 'react-native'
import { Task } from '@/api/get-tasks'
import { Home, User } from 'lucide-react-native'

export function ActivityCardContentBody({ task }: { task: Task }) {
	return (
		<View className="flex-1 gap-2 pr-6">
			<View className="flex-row">
				<View className="mr-3 rounded-full">
					<Home size={20} color="#6B7280" />
				</View>
				<Text className="mr-3 text-wrap text-sm text-gray-500">
					{task.service_floor}, Bloco {task.service_tower}, {task.construction_name}
				</Text>
			</View>
			<View className="flex-row">
				<View className="mr-3 rounded-full">
					<User size={20} color="#6B7280" />
				</View>
				<Text className="t</View>ext-sm text-gray-500">{task.worker_name}</Text>
			</View>
		</View>
	)
}
