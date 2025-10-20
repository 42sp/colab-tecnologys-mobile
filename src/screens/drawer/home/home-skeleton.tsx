import { View } from 'react-native'
import { Skeleton } from '@/components/ui/skeleton'

export function HomeSkeleton() {
	return (
		<View className="gap-2">
			<View className="mx-2 flex-row gap-2" style={{ height: 32 }}>
				<Skeleton className="flex-1 rounded-full" borderRadius={999} />
				<Skeleton className="flex-1 rounded-full" borderRadius={999} />
				<Skeleton className="flex-1 rounded-full" borderRadius={999} />
				<Skeleton className="flex-1 rounded-full" borderRadius={999} />
			</View>
			<View className="mx-2 flex-row gap-2" style={{ height: 80 }}>
				<Skeleton className="flex-1 rounded-lg" borderRadius={16} />
				<Skeleton className="flex-1 rounded-lg" borderRadius={16} />
			</View>
			<View className="mx-3 w-full" style={{ height: 600 }}>
				<Skeleton className="flex-1 rounded-lg" borderRadius={16} />
			</View>
		</View>
	)
}
