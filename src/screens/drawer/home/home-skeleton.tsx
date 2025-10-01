import { View } from 'react-native'
import { Skeleton } from '@/components/ui/skeleton'

export function HomeSkeleton() {
  return (
    <View className='gap-5'>
      <View className='flex-row w-full gap-1' style={{ height: 32 }}>
        <Skeleton className="flex-1 rounded-full" />
        <Skeleton className="flex-1 rounded-full" />
        <Skeleton className="flex-1 rounded-full" />
        <Skeleton className="flex-1 rounded-full" />
      </View>
      <View className="flex-row gap-3 w-full"  style={{ height: 120 }}>
        <Skeleton className="flex-1 rounded-lg" />
        <Skeleton className="flex-1 rounded-lg" />
        <Skeleton className="flex-1 rounded-lg" />
      </View>
      <View className=" w-full" style={{ height: 400 }}>
        <Skeleton className="flex-1 rounded-lg" />
      </View>
    </View>
  )
}
