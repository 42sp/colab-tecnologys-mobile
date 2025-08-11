import { Text, View } from 'react-native'
import Card from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { PaintRoller, Building2, House, Blocks, BrickWall, User } from 'lucide-react-native'

interface ActivityCardProps {
	data: {
		title: string
		jobType: 'parede' | 'contrapiso' | 'pintura'
		location: string
		locationType: 'house' | 'building'
		employee: string
		time: Date
	}
}

export function ActivityCard({ data }: ActivityCardProps) {
	function getJobTypeIcon() {
		switch (data.jobType) {
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
						<Text className="text-md font-inter-bold ">{data.title}</Text>
						{data.time ? (
							<Text className="font-inter text-xs">
								{data.time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
							</Text>
						) : (
							<Text className="font-inter text-xs">00:00</Text>
						)}
					</View>
					<View>
						<View className="flex-row gap-2">
							{data.locationType === 'house' ? (
								<House size={14} color="black" />
							) : (
								<Building2 size={14} color="black" />
							)}
							<Text className="flex-1 font-inter text-sm">{data.location}</Text>
						</View>
						<View className="flex-row gap-2">
							<User size={14} color="black" />
							<Text className="flex-1 font-inter text-sm">{data.employee}</Text>
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
