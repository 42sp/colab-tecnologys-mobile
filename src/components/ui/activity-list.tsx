import React from 'react'
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
	title: string
	jobType: ColorDotVariant
	location: string
	locationType: any
	employee: string
	time: Date
}

interface ActivityListProps {
	data: { title: string; data: Activity[] }[]
}

export function ActivityList({ data }: ActivityListProps) {
	return (
		<View className="">
			<View className="absolute left-1.5 top-4 h-full w-0.5 bg-gray-400" />
			<SectionList
				className=""
				sections={data}
				renderItem={({ item }) => (
					<View className="w-full flex-row items-start justify-start">
						{/* Dot */}
						<View className={`mt-3 h-3 w-3 rounded-full ${ColorDotVariants[item.jobType].color}`} />

						<View className="w-full p-2 ">
							<ActivityCard data={item} />
						</View>
					</View>
				)}
			/>
		</View>
	)
}
