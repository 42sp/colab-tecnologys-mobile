import { Feather } from '@expo/vector-icons'
import { Text } from 'react-native'

import Card from '@/components/ui/card'

type SumaryVariant = 'blue' | 'orange' | 'green' | 'purple'

const baseStyle = `p-2 items-center justify-center rounded-full`

const sumaryVariants: Record<SumaryVariant, { container: string; iconColor: string }> = {
	blue: {
		container: `${baseStyle} bg-blue-300`,
		iconColor: '#3B82F6',
	},
	orange: {
		container: `${baseStyle} bg-orange-700`,
		iconColor: '#EAB308',
	},
	green: {
		container: `${baseStyle} bg-green-700`,
		iconColor: '#22C55E',
	},
	purple: {
		container: `${baseStyle} bg-purple-300`,
		iconColor: '#8B5CF6',
	},
}

interface SummaryCardProps {
	icon: keyof typeof Feather.glyphMap
	SumaryVariant: SumaryVariant
	value: string | number
	label: string
}

export function SummaryCard({ icon, SumaryVariant, value, label }: SummaryCardProps) {
	return (
		<Card className="flex-1 items-center justify-between">
			<Card.Header className={sumaryVariants[SumaryVariant].container}>
				<Feather
					name={icon}
					size={16}
					color={sumaryVariants[SumaryVariant].iconColor}
					className="px-2"
				>
					<Text adjustsFontSizeToFit className="font-inter-bold font-bold color-white">
						{` ${value}`}
					</Text>
				</Feather>
			</Card.Header>
			<Card.Body className="items-center">
				<Text adjustsFontSizeToFit className="font-inter text-sm text-gray-500">
					{label}
				</Text>
			</Card.Body>
		</Card>
	)
}
