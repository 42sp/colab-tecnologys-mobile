import { PieChart } from 'react-native-gifted-charts'
import { Productivity } from './header'
import { Text } from 'react-native'

interface HeaderChartProps {
	weeklyProgress: Productivity[]
}

export function HeaderChart({ weeklyProgress }: HeaderChartProps) {
	const productivityWeek = weeklyProgress.reduce((sum, item) => sum + item.value, 0)

	return (
		<PieChart
			data={[
				...weeklyProgress,
				{
					value: 100 - weeklyProgress.reduce((sum, item) => sum + item.value, 0),
					color: '#EEEEEE',
					text: 'Restante',
				},
			]}
			donut
			radius={70}
			innerRadius={50}
			centerLabelComponent={() => <Text className="text-xl font-bold">{productivityWeek}%</Text>}
		/>
	)
}
