import { View } from 'react-native'
import { Skeleton } from '@/components/ui/skeleton'

export function ProductivitySkeleton() {
  return (
    <View className="flex-1 gap-5 w-full">
      <View className="px-5 pt-5">
        <Skeleton className="rounded-lg" style={{ height: 180 }} />
      </View>
      <View className="w-full" style={{ height: 60 }}>
        <Skeleton className="flex-1 rounded-lg" />
      </View>
      <View className="w-full px-5 pb-5" style={{ height: 420 }}>
        <Skeleton className="flex-1 rounded-lg" />
      </View>
    </View>
  )
}
