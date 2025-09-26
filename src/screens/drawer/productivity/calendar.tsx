import { useState } from 'react'
import { CalendarProvider, WeekCalendar } from 'react-native-calendars'

export function Calendar() {
	const [selectedDay, setSelectedDay] = useState('2025-09-09')

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

	return (
		<CalendarProvider date={selectedDay}>
			<WeekCalendar
				onDayPress={(day) => setSelectedDay(day.dateString)}
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
