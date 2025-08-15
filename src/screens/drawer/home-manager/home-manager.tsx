import { ActivityList } from '@/screens/drawer/home/activity-list'
import { ActivityCard } from '@/screens/drawer/home/activity-card'
import { Button } from '@/components/ui/button'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Calendar as Teste, DateData } from 'react-native-calendars'
import { useEffect, useState } from 'react'
import CustomCalendar, { DateRange } from '@/components/ui/calendar'

export default function HomeManagerScreen() {
	const [range, setRange] = useState<DateRange>({ start: null, end: null })
	const [selectDay, setSelectDay] = useState<DateRange>({ start: null, end: null })

	useEffect(() => {
		if (!range) return
		console.log('HERE:', range)

		if (!range) return
		console.log('HERE:', range)
	}, [range, selectDay])

	return (
		<SafeAreaView className=" w-full flex-1 gap-4 bg-[#F9FAFB] p-5 ">
			<View className="flex-1">
				<CustomCalendar setDateRange={setRange} />
				<CustomCalendar setDateRange={setSelectDay} markingType="dot" />
			</View>
		</SafeAreaView>
	)
}
