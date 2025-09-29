import { View, Text } from 'react-native'
import { HeaderInfo } from './header-info'
import { HeaderChart } from './header-chart'
import { Task } from '@/api/get-tasks'

const weeklyProgress = [
	{ value: 74, color: '#A0D7FF', text: 'Previsto' },
	{ value: 19, color: '#007AFF', text: 'Completo' },
]

export type Productivity = {
	value: number
	color: string
	text: string
}

interface HeaderProps {
	tasks?: Task[]
}

export function Header({ tasks }: HeaderProps) {
	const numbeOfTasks: number = tasks?.length ?? 0;
	const numbeOfTasksCompleted: number = tasks?.filter(task => task.status == 'completed').length ?? 0
	const getComplited = () => Number(numbeOfTasks ? ((numbeOfTasksCompleted / numbeOfTasks) * 100).toFixed(2) : 0);
	const produtivity: Productivity[] = [
		{ value: 100 - getComplited(), color: '#A0D7FF', text: 'Previsto' },
		{ value: getComplited(), color: '#007AFF', text: 'Completo' },
	]
	return (
		<View className="m-4 flex-row items-center justify-between rounded-3xl bg-white px-4">
			<View className="">
				<Text className="mb-2 text-lg font-semibold">Progresso semanal</Text>
				{produtivity.map((item) => (
					<HeaderInfo key={item.text} {...item} />
				))}
			</View>

			<View className="h-full w-[1px] bg-slate-200"></View>

			<View className="py-4">
				<HeaderChart weeklyProgress={produtivity} tasks={tasks} />
			</View>
		</View>
	)
}
