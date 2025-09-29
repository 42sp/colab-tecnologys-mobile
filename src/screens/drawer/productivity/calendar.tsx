import { CalendarProvider, WeekCalendar } from 'react-native-calendars'
import type { FC } from 'react'

type Props = {
	selectedDay?: string
	onDayPress?: (dateString: string) => void
}

export const Calendar: FC<Props> = ({ selectedDay, onDayPress }) => {
	const productivityByDay: Record<string, number> = {
		'2025-09-09': 65,
		'2025-09-10': 95,
		'2025-09-12': 30,
	}

	const getDayColor = (date: string) => {
		const percent = productivityByDay[date]
		if (percent >= 80) return '#4CAF50' // verde
		if (percent >= 50) return '#FFC107' // amarelo
		return '#F44336' // vermelho
	}

	const providerDate = selectedDay ?? new Date().toISOString().split('T')[0]

	return (
		<CalendarProvider date={providerDate}>
			<WeekCalendar
				onDayPress={(day) => onDayPress && onDayPress(day.dateString)}
				markedDates={Object.keys(productivityByDay).reduce(
					(acc, date) => ({
						...acc,
						[date]: {
							selected: true,
							selectedColor: getDayColor(date),
							marked: true,
						},
					}),
					{},
				)}
				theme={{
					todayTextColor: '#007AFF',
					selectedDayTextColor: '#fff',
					arrowColor: '#007AFF',
				}}
			/>
		</CalendarProvider>
	)
}
