import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type ButtonVariant = 'default' | 'outline' | 'red' | 'gradient'

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
