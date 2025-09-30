import { View, ViewProps } from 'react-native'
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: ViewProps & { className?: string }) {
  return (
    <View
      className={cn("rounded-md bg-gray-200", className)}
      style={{
        backgroundColor: '#E5E7EB',
      }}
      {...props}
    />
  )
}

export { Skeleton }
