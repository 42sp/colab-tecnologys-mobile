import { SectionList, Text, View } from 'react-native'
import { ActivityCard } from './activity-card'
import { Task } from '@/api/get-tasks'

const ColorDotVariants: Record<'Alvenaria' | 'Contrapiso' | 'Pintura', { color: string }> = {
	Alvenaria: {
		color: 'bg-blue-500',
	},
	Contrapiso: {
		color: 'bg-red-500',
	},
	Pintura: {
		color: 'bg-amber-500',
	},
}

interface ActivityListProps {
	data: { title: string; data: Task[] }[]
	className?: string
	HeaderComponent?: React.ReactNode
}

export function ActivityList({ data, className, HeaderComponent }: ActivityListProps) {
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
				renderItem={({ item }) => {
					const colorDot =
						ColorDotVariants[item.service_type as keyof typeof ColorDotVariants]?.color ||
						'bg-gray-500'
					return (
						<View className="w-full flex-row">
							<View className="ml-3 items-center">
								<View className={`h-3 w-3 rounded-full bg-blue-500 ${colorDot}`} />
								<View className="w-0.5 flex-1 bg-gray-400" />
							</View>
							<View className="mb-2 ml-2 flex-1">
								<ActivityCard {...item} />
							</View>
						</View>
					)
				}}
				ListHeaderComponent={() => HeaderComponent}
			/>
		</View>
	)
}
