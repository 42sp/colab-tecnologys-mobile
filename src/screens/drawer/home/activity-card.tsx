import { Text, View } from 'react-native'
import Card from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PaintRoller, Building2, House, Blocks, BrickWall, User } from 'lucide-react-native'
import { Task } from '@/api/get-tasks'

interface ActivityCardProps extends Task {}

export function ActivityCard({
	service_type,
	construction_name,
	construction_address,
	service_stage,
	service_floor,
	service_apartment,
	service_tower,
	created_at,
}: ActivityCardProps) {
	const title = `${service_type} - ${service_stage} ${service_floor}/${service_apartment} - Torre ${service_tower}`

	const time = new Date(created_at as string)
	function getJobTypeIcon() {
		switch (service_type) {
			case 'Alvenaria':
				return (
					<View className="size-10 items-center justify-center rounded-full bg-blue-100">
						<BrickWall size={18} color="#262626" />
					</View>
				)
			case 'Contrapiso':
				return (
					<View className="size-10 items-center justify-center rounded-full bg-red-100">
						<Blocks size={18} color="#262626" />
					</View>
				)
			case 'Pintura':
				return (
					<View className="size-10 items-center justify-center rounded-full bg-amber-100">
						<PaintRoller size={18} color="#262626" />
					</View>
				)
		}
	}

	return (
		<View className="">
			<Card className="flex-row">
				{getJobTypeIcon()}
				<Card.Body className="flex-1 justify-between gap-4 ">
					<View className="flex-row justify-between">
						<Text className="text-md font-inter-bold ">{title}</Text>
						{time ? (
							<Text className="font-inter text-xs">
								{time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
							</Text>
						) : (
							<Text className="font-inter text-xs">00:00</Text>
						)}
					</View>
					<View>
						<View className="flex-row gap-2">
							<Building2 size={14} color="black" />
							<Text className="flex-1 font-inter text-sm">{construction_address}</Text>
						</View>
						<View className="flex-row gap-2">
							<User size={14} color="black" />
							<Text className="flex-1 font-inter text-sm">{construction_name}</Text>
						</View>
					</View>
					<View className="hidden pl-14">
						<Button variant="green" title="Aprovar" />
					</View>
				</Card.Body>
			</Card>
		</View>
	)
}
