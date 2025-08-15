import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Calendar, CalendarProps } from 'react-native-calendars'

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
} & CalendarProps

export function CustomCalendar({ setDateRange, markingType = 'period', ...rest }: CustomCalendarProps) {
	const [range, setRange] = useState<DateRange>({
		start: null,
		end: null,
	})
	const [selectedDates, setSelectedDates] = useState<any>({})

	useEffect(() => {
		if (!range || !setDateRange) return
		setDateRange(range)
	}, [range])

	const onDayPress = (day: { dateString: string }) => {
		const selectedDate = new Date(day.dateString)

		if (markingType === 'dot' || markingType === 'multi-dot') {
			setRange({ start: selectedDate, end: null })
			setSelectedDates({
				[day.dateString]: {
					selected: true,
					dots: [{ color: '#d16a32' }],
				},
			})
			return
		}

		if (!range.start || (range.start && range.end)) {
			setRange({ start: selectedDate, end: null })
			setSelectedDates({
				[day.dateString]: { startingDay: true, color: '#d16a32', textColor: 'white' },
			})
		} else if (range.start && !range.end) {
			const start = range.start < selectedDate ? range.start : selectedDate
			const end = range.start < selectedDate ? selectedDate : range.start
			setRange({ start, end })

			setSelectedDates(markedStyleDates(start, end))
		}
	}

	return (
		<Calendar
			onDayPress={onDayPress}
			markingType={markingType}
			markedDates={selectedDates}
			theme={{
				arrowColor: '#B73131',
				textDayHeaderFontFamily: 'Inter_500Medium',
				todayTextColor: '#B73131',
				todayDotColor: '#B73131',
				textMonthFontWeight: 'bold',
				monthTextColor: '#B73131',
				selectedDayBackgroundColor: '#d16a32',
			}}
			{...rest}
		/>
	)
}
