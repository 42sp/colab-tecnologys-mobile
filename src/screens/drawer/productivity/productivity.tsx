import React, { useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { CalendarList, CalendarProvider, WeekCalendar } from 'react-native-calendars'
import { PieChart } from 'react-native-gifted-charts'

type Task = {
	id: string
	date: string
	title: string
	percent: number
	location: string
	responsible: string
}

export default function ProductivityScreen() {
	const [selectedDay, setSelectedDay] = useState('2025-09-09')

	// TODO: integrar backend para buscar dados reais
	const tasks: Task[] = [
		{
			id: '1',
			date: '2025-09-09',
			title: '2 paredes construídas',
			percent: 65,
			location: 'Andar 3, Bloco B, Residencial Jardins',
			responsible: 'Carlos Silva',
		},
		{
			id: '2',
			date: '2025-09-10',
			title: '3 paredes construídas',
			percent: 95,
			location: 'Andar 3, Bloco B, Residencial Jardins',
			responsible: 'Carlos Silva',
		},
		{
			id: '3',
			date: '2025-09-12',
			title: '3 paredes construídas',
			percent: 30,
			location: 'Andar 3, Bloco B, Residencial Jardins',
			responsible: 'Carlos Silva',
		},
	]

	const productivityByDay: Record<string, number> = {
		'2025-09-09': 65,
		'2025-09-10': 95,
		'2025-09-12': 30,
	}

	// Gráfico semanal (mock)
	const weeklyProgress = [
		{ value: 73, color: '#A0D7FF', text: 'Previsto' },
		{ value: 18, color: '#007AFF', text: 'Completo' },
	]

	const getDayColor = (date: string) => {
		const percent = productivityByDay[date]
		if (percent >= 80) return '#4CAF50' // verde
		if (percent >= 50) return '#FFC107' // amarelo
		return '#F44336' // vermelho
	}

	return (
		<ScrollView className="flex-1 bg-white p-4">
			{/* Resumo + gráfico */}
			<View className="mb-6 flex-row items-center justify-between">
				{/* Resumo */}
				<View>
					<Text className="mb-2 text-lg font-semibold">Progresso semanal</Text>
					<View className="mb-1 flex-row items-center">
						<View className="mr-2 h-3 w-3 rounded-full bg-[#A0D7FF]" />
						<Text className="text-base">Previsto 73%</Text>
					</View>
					<View className="flex-row items-center">
						<View className="mr-2 h-3 w-3 rounded-full bg-[#007AFF]" />
						<Text className="text-base">Completo 18%</Text>
					</View>
				</View>

				{/* Gráfico */}
				<PieChart
					data={weeklyProgress}
					donut
					radius={70}
					innerRadius={50}
					centerLabelComponent={() => <Text className="text-xl font-bold">91%</Text>}
				/>
			</View>

			{/* Calendário - somente semana */}
			<CalendarProvider date={selectedDay}>
				<WeekCalendar
					firstDay={1} // semana começa na segunda
					onDayPress={(day) => setSelectedDay(day.dateString)}
					markedDates={Object.keys(productivityByDay).reduce(
						(acc, date) => ({
							...acc,
							[date]: {
								selected: date === selectedDay,
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

			{/* Lista de tarefas do dia */}
			<View className="mt-6">
				<Text className="mb-4 text-lg font-semibold">Todas as tarefas</Text>
				{/* Group tasks by date and render each group */}
				{Object.entries(
					tasks.reduce(
						(acc, task) => {
							// Group tasks by date
							if (!acc[task.date]) {
								acc[task.date] = []
							}
							acc[task.date].push(task)
							return acc
						},
						{} as Record<string, Task[]>,
					),
				).map(([date, dateTasks]) => (
					<View key={date} className="mb-6">
						<Text className="mb-2 text-base font-bold">
							{new Date(date).toLocaleDateString('pt-BR', {
								weekday: 'long',
								day: 'numeric',
								month: 'long',
							})}
						</Text>
						{dateTasks.map((task) => (
							<View key={task.id} className="mb-4 rounded-2xl bg-gray-100 p-4 shadow">
								<Text className="text-base font-semibold">{task.title}</Text>
								<Text className="text-sm text-gray-500">{task.location}</Text>
								<Text className="text-sm text-gray-500">{task.responsible}</Text>
								<Text
									className={`text-right font-bold ${
										task.percent >= 80
											? 'text-green-600'
											: task.percent >= 50
												? 'text-yellow-600'
												: 'text-red-600'
									}`}
								>
									{task.percent}%
								</Text>
							</View>
						))}
					</View>
				))}
			</View>
		</ScrollView>
	)
}
