import { Feather } from '@expo/vector-icons'
import { Text } from 'react-native'

import Card from '@/components/ui/card'

type SumaryVariant = 'blue' | 'orange' | 'green'

const baseStyle = `p-2 items-center justify-center rounded-full`

const sumaryVariants: Record<SumaryVariant, { container: string; iconColor: string }> = {
	blue: {
		container: `${baseStyle} bg-blue-100`,
		iconColor: '#3B82F6',
	},
	orange: {
		container: `${baseStyle} bg-orange-100`,
		iconColor: '#EAB308',
	},
	green: {
		container: `${baseStyle} bg-green-100`,
		iconColor: '#22C55E',
	},
}

interface SummaryCardProps {
	icon: keyof typeof Feather.glyphMap
	SumaryVariant: SumaryVariant
	value: string | number
	label: string
}

export function SummaryCard({
	icon,
	SumaryVariant,
	value,
	label,
}: SummaryCardProps) {
	return (
		<Card className="flex-1 items-center justify-between p-3">
			<Card.Header className={sumaryVariants[SumaryVariant].container}>
				<Feather name={icon} size={16} color={sumaryVariants[SumaryVariant].iconColor} />
			</Card.Header>
			<Card.Body className="mt-2 items-center">
				<Text adjustsFontSizeToFit numberOfLines={1} className="font-inter-bold text-2xl font-bold">
					{value}
				</Text>
				<Text adjustsFontSizeToFit numberOfLines={1} className="font-inter text-sm text-gray-500">
					{label}
				</Text>
			</Card.Body>
		</Card>
	)
}
