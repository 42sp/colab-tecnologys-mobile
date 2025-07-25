import { Dropdown, DropdownProps } from 'react-native-element-dropdown';
import { Feather } from '@expo/vector-icons'
import { Pressable, TextInputProps, View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

const data = [
    { label: 'Item 1' },
    { label: 'Item 2' },
    { label: 'Item 3' },
    { label: 'Item 4' },
]

interface DropdownProps extends TextInputProps {
	IconLeft?: keyof typeof Feather.glyphMap
	IconRight?: keyof typeof Feather.glyphMap
	iconColor?: string
	IconPress?: () => void
    label?: string
}

export function Dropdown ({
    IconLeft,
	IconRight,
    IconPress,
	className,
	iconColor,
	...rest}: DropdownProps) {
        return (
    <View className="p-4">
        {IconLeft && <Feather name={IconLeft} size={20} color={iconColor ? iconColor : '#d4d4d4'} />}

		<Dropdown className={`flex-1 font-inter placeholder:text-neutral-400`} {...rest} />

		{IconRight && (
				<Pressable onPress={IconPress}>
					<Feather name={IconRight} size={20} color={iconColor ? iconColor : '#d4d4d4'} />
				</Pressable>
			)}
    </View>
    )
}