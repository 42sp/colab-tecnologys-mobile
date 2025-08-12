import { SectionList, Text, View } from 'react-native'
import { ActivityCard } from './activity-card'
import { ActivityService } from '@/mock'

const ColorDotVariants: Record<'parede' | 'contrapiso' | 'pintura', { color: string }> = {
	parede: {
		color: 'bg-blue-500',
	},
	contrapiso: {
		color: 'bg-red-500',
	},
	pintura: {
		color: 'bg-amber-500',
	},
}

interface ActivityListProps {
	data: { title: string; data: ActivityService[] }[]
	className?: string
}

export function ActivityList({ data, className }: ActivityListProps) {
	return (
		<View className={`w-full flex-1 ${className}`}>
			<SectionList
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
				sections={data}
				renderSectionHeader={({ section }) => {
					return <Text className="py-3 font-inter text-neutral-600">{section.title}</Text>
				}}
				keyExtractor={(item) => `${item.id}`}
				renderItem={({ item, index }) => (
					<View className="w-full flex-row">
						<View className="ml-3 items-center">
							<View
								className={`h-3 w-3 rounded-full ${ColorDotVariants[item.serviceType].color}`}
							/>
							<View className="w-0.5 flex-1 bg-gray-400" />
						</View>
						<View className="mb-2 ml-2 flex-1">
							<ActivityCard {...item} />
						</View>
					</View>
				)}
			/>
		</View>
	)
}
