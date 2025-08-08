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
	className?: string
}

export function ActivityList({ data, className }: ActivityListProps) {
	return (
		<View className={` w-full ${className}`}>
			<SectionList
				className=""
				scrollEnabled={true}
				sections={data}
				renderItem={({ item }) => (
					<View className=" w-full flex-row border border-black">
						<View className="items-center">
							<View className=" h-full w-0.5 bg-gray-400" />
							<View className={` h-3 w-3 rounded-full ${ColorDotVariants[item.jobType].color}`} />
						</View>
						<View className="ml-2 flex-1">
							<ActivityCard data={item} />
						</View>
					</View>
				)}
			/>
		</View>
	)
}

// export function ActivityList({ data, className }: ActivityListProps) {
//   return (
//     <View className={`w-full ${className}`}>
//       <SectionList
//         sections={data}
//         keyExtractor={(item, index) => item.title + index}
//         renderItem={({ item }) => (
//           <View className="flex-row border border-black w-full p-2">
//             <View className="items-center">
//               <View className="h-full w-0.5 bg-gray-400" />
//               <View className={`h-3 w-3 rounded-full ${ColorDotVariants[item.jobType].color}`} />
//             </View>
//             <View className="flex-1 ml-2">
//               <ActivityCard data={item} />
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   )
// }
