import { SectionList, View } from 'react-native'
import { ActivityCard } from '@/components/ui/activity-card'

type ColorDotVariant = 'parede' | 'contrapiso' | 'pintura'

const ColorDotVariants: Record<ColorDotVariant, { color: string }> = {
	parede: {
		color: 'bg-blue-500',
	},
	contrapiso: {
		color: 'bg-red-500',
	},
	pintura: {
		color: 'bg-yellow-500',
	},
}

interface Activity {
	id: string
	title: string
	jobType: ColorDotVariant
	location: string
	locationType: any
	employee: string
	time: Date
}

interface ActivityListProps {
	data: { title: string; data: Activity[] }[]
	className?: string
}

export function ActivityList({ data, className }: ActivityListProps) {
	return (
		<View className={`w-full ${className}`}>
			<SectionList
				scrollEnabled={true}
				sections={data}
				keyExtractor={(item) => `${item.id}`}
				renderItem={({ item, index }) => (
					<View className=" w-full flex-row">
						<View className="items-center">
							<View className={`h-3 w-3 rounded-full ${ColorDotVariants[item.jobType].color}`} />
							<View className="w-0.5 flex-1 bg-gray-400" />
						</View>
						<View className="mb-2 ml-2 flex-1">
							<ActivityCard data={item} />
						</View>
					</View>
				)}
			/>
		</View>
	)
}
