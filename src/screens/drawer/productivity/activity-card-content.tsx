import { View } from 'react-native'
import { Task } from './activity'
import { ActivityCardContentHeader } from './activity-card-content-header'
import { ActivityCardContentBody } from './activity-card-content-body'
import { Blocks, BrickWall, PaintRoller } from 'lucide-react-native'

interface ActivityCardContentProps {
	task: Task
}

function ActivityCardContentIcon({ serviceType }: { serviceType: string }) {
	switch (serviceType.toLowerCase()) {
		case 'parede':
			return (
				<View className="size-10 items-center justify-center rounded-full bg-blue-100">
					<BrickWall size={18} color="#262626" />
				</View>
			)
		case 'contrapiso':
			return (
				<View className="size-10 items-center justify-center rounded-full bg-red-100">
					<Blocks size={18} color="#262626" />
				</View>
			)
		case 'pintura':
			return (
				<View className="size-10 items-center justify-center rounded-full bg-amber-100">
					<PaintRoller size={18} color="#262626" />
				</View>
			)
		default:
			return (
				<View className="size-10 items-center justify-center rounded-full bg-red-100">
					<Blocks size={18} color="#262626" />
				</View>
			)
	}
}

export function ActivityCardContent({ task }: ActivityCardContentProps) {
	return (
		<View className="mb-4 flex-row rounded-2xl bg-white py-4 shadow">
			<View className="flex w-[20%] items-center">
				{/* <Feather name='plus' size={32} color="#000" /> */}
				<ActivityCardContentIcon serviceType={task.service_type} />
			</View>
			<View className="flex-1 flex-col">
				<ActivityCardContentHeader task={task} />
				<ActivityCardContentBody task={task} />
			</View>
		</View>
	)
}
