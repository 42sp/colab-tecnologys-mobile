import { Text, View } from 'react-native'
import Card from '@/components/ui/card'
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'

type IconLocationVariant = 'unidade' | 'predio'

const IconLocationVariants: Record<IconLocationVariant, { icon: keyof typeof Feather.glyphMap }> = {
	unidade: {
		icon: 'home',
	},
	predio: {
		icon: 'trello',
	},
}

type IconJobVariant = 'parede' | 'contrapiso' | 'pintura'

const IconJobVariants: Record<IconJobVariant, { icon: keyof typeof Feather.glyphMap }> = {
	parede: {
		icon: 'credit-card',
	},
	contrapiso: {
		icon: 'plus-square',
	},
	pintura: {
		icon: 'droplet',
	},
}

interface ActivityCardProps {
	data: {
		title: string
		jobType: IconJobVariant
		location: string
		locationType: IconLocationVariant
		employee: string
		time: Date
	}
}

export function ActivityCard({ data }: ActivityCardProps) {
	return (
		<View className="">
			<Card className="flex-row">
				<View>
					<Button variant="rounded" className="size-10 bg-blue-100">
						<Feather name={IconJobVariants[data.jobType].icon} size={14} color={'black'} />
					</Button>
				</View>
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
							<Feather
								name={IconLocationVariants[data.locationType].icon}
								size={14}
								color="black"
							/>
							<Text className="flex-1 font-inter text-sm">{data.location}</Text>
						</View>
						<View className="flex-row gap-2">
							<Feather name={'user'} size={14} color="black" />
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
