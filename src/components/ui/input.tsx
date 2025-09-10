import { Feather } from '@expo/vector-icons'
import { Pressable, TextInput, TextInputProps, View } from 'react-native'

interface InputProps extends TextInputProps {
	IconLeft?: keyof typeof Feather.glyphMap
	IconRight?: keyof typeof Feather.glyphMap
	iconColor?: string
	iconPress?: () => void
	hasError?: boolean
}

export function Input({
	IconLeft,
	IconRight,
	iconPress,
	className,
	iconColor,
	hasError = false,
	...rest
}: InputProps) {
	const errorClass = hasError ? 'border-2 border-red-400' : ''
	const iconColorStyle = hasError ? '#ef4444' : iconColor ? iconColor : '#d4d4d4'

	return (
		<View
			className={`flex h-14 w-full flex-row items-center justify-between gap-3 rounded-lg border border-neutral-300 px-4 text-neutral-700 ${errorClass} ${className}`}
		>
			{IconLeft && <Feather name={IconLeft} size={20} color={iconColorStyle} />}

			<TextInput className={'flex-1 font-inter placeholder:text-neutral-400'} {...rest} />

			{IconRight && (
				<Pressable onPress={iconPress}>
					<Feather name={IconRight} size={20} color={iconColorStyle} />
				</Pressable>
			)}
		</View>
	)
}
