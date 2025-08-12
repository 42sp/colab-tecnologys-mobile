import { ActivityList } from '@/screens/drawer/home/activity-list'
import { ActivityCard } from '@/screens/drawer/home/activity-card'
import { Button } from '@/components/ui/button'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeManagerScreen() {
	return (
		<SafeAreaView className=" w-full flex-1 gap-4 bg-[#F9FAFB] p-5 ">
			<View className="flex-1">
				{/* <ActivityList
					className=""
					data={[
						{
							title: '',
							data: mockData.map((item) => ({
								...item,
								jobType: item.jobType as any,
							})),
						},
					]}
				/> */}
			</View>
		</SafeAreaView>
	)
}
