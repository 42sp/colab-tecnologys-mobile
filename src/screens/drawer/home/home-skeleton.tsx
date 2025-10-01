import { View } from 'react-native'
import { Skeleton } from '@/components/ui/skeleton'

export function HomeSkeleton() {
	return (
		<View className="gap-5">
			<View className="w-full flex-row gap-1" style={{ height: 32 }}>
				<Skeleton className="flex-1 rounded-full" borderRadius={999} />
				<Skeleton className="flex-1 rounded-full" borderRadius={999} />
				<Skeleton className="flex-1 rounded-full" borderRadius={999} />
				<Skeleton className="flex-1 rounded-full" borderRadius={999} />
			</View>
			<View className="w-full flex-row gap-3" style={{ height: 120 }}>
				<Skeleton className="flex-1 rounded-lg" borderRadius={16} />
				<Skeleton className="flex-1 rounded-lg" borderRadius={16} />
				<Skeleton className="flex-1 rounded-lg" borderRadius={16} />
			</View>
			<View className="w-full" style={{ height: 400 }}>
				<Skeleton className="flex-1 rounded-lg" borderRadius={16} />
			</View>
		</View>
	)
}
