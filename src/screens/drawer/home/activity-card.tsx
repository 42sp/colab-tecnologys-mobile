import { Text, View } from 'react-native'
import Card from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PaintRoller, Building2, House, Blocks, BrickWall, User } from 'lucide-react-native'
import { ActivityService } from '@/mock'

interface ActivityCardProps extends ActivityService {}

export function ActivityCard({ title, serviceType, employee, location, time }: ActivityCardProps) {
	function getJobTypeIcon() {
		switch (serviceType) {
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
							<Text className="flex-1 font-inter text-sm">{location}</Text>
						</View>
						<View className="flex-row gap-2">
							<User size={14} color="black" />
							<Text className="flex-1 font-inter text-sm">{employee}</Text>
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
