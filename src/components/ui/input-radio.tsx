import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export type RadioCheckVariant = 'radio' | 'checkbox' | 'green-circle'

type Props = {
	label: string
	selected: boolean
	onPress: () => void
	variant?: RadioCheckVariant
}

export function RadioCheckOption({ label, selected, onPress, variant = 'radio' }: Props) {
	return (
		<TouchableOpacity onPress={onPress} className="mr-4 flex-row items-center" activeOpacity={0.8}>
			<View
				className={`mr-2 h-6 w-6 items-center justify-center 
          ${variant === 'checkbox' ? 'rounded-md border border-gray-300' : 'rounded-full border border-gray-300'}
          ${selected && variant === 'green-circle' ? 'bg-emerald-500' : ''}
        `}
			>
				{selected && variant === 'radio' && <View className="h-3.5 w-3.5 rounded-full bg-black" />}

				{selected && variant === 'green-circle' && <Feather name="check" size={14} color="white" />}

				{selected && variant === 'checkbox' && (
					<View className="h-5 w-5 items-center justify-center rounded-full bg-emerald-500">
						<Feather name="check" size={14} color="white" />
					</View>
				)}
			</View>

			<Text className="text-lg text-gray-800">{label}</Text>
		</TouchableOpacity>
	)
}
