import { View } from 'react-native'
import { Skeleton } from '@/components/ui/skeleton'

export function RegisterServiceSkeleton() {
  return (
    <View className="flex-1 gap-5 p-5 w-full">
      <Skeleton className="rounded-lg" style={{ height: 192 }} />
      <Skeleton className="rounded-lg" style={{ height: 192 }} />
      <Skeleton className="rounded-lg" style={{ height: 192 }} />
      <Skeleton className="rounded-lg" style={{ height: 192 }} />
    </View>



  )
}
