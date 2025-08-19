import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type ButtonVariant =
	| 'default'
	| 'outline'
	| 'red'
	| 'gradient'
	| 'rounded'
	| 'pill'
	| 'redPill'
	| 'green'
	| 'select'
	| 'selected'

const baseStyle = `rounded-xl h-16 w-full items-center justify-center flex-row`

const buttonVariants: Record<ButtonVariant, { container: string; text: string }> = {
	default: {
		container: `${baseStyle} bg-black`,
		text: 'text-neutral-100 text-xl font-inter-medium',
	},
	outline: {
		container: `${baseStyle} bg-transparent border-2 border-gray-200`,
		text: 'text-black text-xl font-inter-medium',
	},
	red: {
		container: `${baseStyle} bg-red-50`,
		text: 'text-red-500 text-xl font-inter-medium',
	},
	gradient: {
		container: `${baseStyle}`,
		text: 'text-white text-xl font-inter-medium',
	},
	rounded: {
		container: 'size-14 rounded-full bg-black items-center justify-center',
		text: '',
	},
	pill: {
		container: ` rounded-full px-4 py-1 items-center`,
		text: 'text-md font-inter',
	},
	redPill: {
		container: `rounded-full pl-4 pr-1 items-center border border-red-500`,
		text: '',
	},
	green: {
		container: `rounded-xl h-10 w-full items-center justify-center flex-row bg-green-500`,
		text: 'text-gray-700 text-xl font-inter-medium',
	},
	select: {
		container: `${baseStyle} bg-transparent border-2 border-gray-200`,
		text: 'text-black font-inter',
	},
	selected: {
		container: `${baseStyle} border-2 border-[#B73131] bg-[#d16a32]/60`,
		text: 'text-black font-inter',
	},
}

type ButtonProps = {
	title?: string
	variant?: ButtonVariant
	textClassName?: string
	gradientColors?: [string, string]
	gradientStart?: { x: number; y: number }
	gradientEnd?: { x: number; y: number }
} & TouchableOpacityProps

export function Button({
	title,
	onPress,
	variant = 'default',
	className,
	textClassName,
	children,
	gradientColors = ['#B73131', '#EAA233'],
	gradientStart = { x: 0, y: 0.5 },
	gradientEnd = { x: 1, y: 0.5 },
	disabled,
	...rest
}: ButtonProps) {
	if (variant === 'gradient') {
		return (
			<TouchableOpacity
				onPress={onPress}
				className={`overflow-hidden rounded-xl ${disabled ? 'opacity-80' : ''} ${className}`}
				activeOpacity={0.8}
				{...rest}
			>
				<LinearGradient
					colors={gradientColors}
					start={gradientStart}
					end={gradientEnd}
					className={buttonVariants.gradient.container}
				>
					{children}
					{title && (
						<Text className={`${buttonVariants.gradient.text} ${textClassName}`}>{title}</Text>
					)}
				</LinearGradient>
			</TouchableOpacity>
		)
	}

	return (
		<TouchableOpacity
			onPress={onPress}
			className={`${buttonVariants[variant].container} ${disabled ? 'opacity-80' : ''} ${className}`}
			activeOpacity={0.8}
			{...rest}
		>
			{children}
			{title && <Text className={`${buttonVariants[variant].text} ${textClassName}`}>{title}</Text>}
		</TouchableOpacity>
	)
}
