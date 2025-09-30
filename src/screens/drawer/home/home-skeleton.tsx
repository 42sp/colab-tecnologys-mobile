import { View } from 'react-native'
import { Skeleton } from '@/components/ui/skeleton'

export default function HomeSkeleton() {
  return (
    <View className="flex-1">
        <View className="flex-row gap-3 w-full">
            <Skeleton className="flex-1 h-40 rounded-lg" />
            <Skeleton className="flex-1 h-40 rounded-lg" />
            <Skeleton className="flex-1 h-40 rounded-lg" />
        </View>
        <View className="py-10 w-full h-full">
            <Skeleton className="flex-1 rounded-lg" />
        </View>
    </View>
  )
}
