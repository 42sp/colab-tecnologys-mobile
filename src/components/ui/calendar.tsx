import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Calendar } from 'react-native-calendars'

function markedStyleDates(start: Date, end: Date) {
	const marked: any = {}
	let current = new Date(start)

	while (current <= end) {
		const dateStr = current.toISOString().split('T')[0]
		marked[dateStr] = { color: '#d16a32', textColor: 'white' }
		current.setDate(current.getDate() + 1)
	}

	marked[start.toISOString().split('T')[0]] = {
		startingDay: true,
		color: '#d16a32',
		textColor: 'white',
	}
	marked[end.toISOString().split('T')[0]] = {
		endingDay: true,
		color: '#d16a32',
		textColor: 'white',
	}

	return marked
}

export interface DateRange {
	start: Date | null
	end: Date | null
}

type CustomCalendarProps = {
	setDateRange?: (range: DateRange) => void
}

export default function CustomCalendar({ setDateRange }: CustomCalendarProps) {
	const [range, setRange] = useState<DateRange>({
		start: null,
		end: null,
	})
	const [markedDates, setMarkedDates] = useState<any>({})

	useEffect(() => {
		if (!range || !setDateRange) return
		setDateRange(range)
	}, [range])

	const onDayPress = (day: { dateString: string }) => {
		const selectedDate = new Date(day.dateString)

		if (!range.start || (range.start && range.end)) {
			setRange({ start: selectedDate, end: null })
			setMarkedDates({
				[day.dateString]: { startingDay: true, color: '#d16a32', textColor: 'white' },
			})
		} else if (range.start && !range.end) {
			const start = range.start < selectedDate ? range.start : selectedDate
			const end = range.start < selectedDate ? selectedDate : range.start
			setRange({ start, end })

			setMarkedDates(markedStyleDates(start, end))
		}
	}

	return (
		<View className="flex-1">
			<Calendar
				onDayPress={onDayPress}
				markingType="period"
				markedDates={markedDates}
				theme={{
					arrowColor: '#B73131',
					textDayHeaderFontFamily: 'Inter_500Medium',
					todayTextColor: '#B73131',
					todayDotColor: '#B73131',
					textMonthFontWeight: 'bold',
					monthTextColor: '#B73131',
				}}
			/>
		</View>
	)
}
