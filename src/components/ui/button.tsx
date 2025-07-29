import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type ButtonVariant = 'default' | 'outline' | 'red' | 'gradient'

const defaultStyle = 'h-16 w-full items-center justify-center rounded-xl flex-row'

const buttonVariants: Record<ButtonVariant, { container: string; text: string }> = {
	default: {
		container: `${defaultStyle} bg-black`,
		text: 'text-neutral-100 text-xl font-inter-medium',
	},
	outline: {
		container: `${defaultStyle} bg-transparent border-2 border-gray-200 outline-solid`,
		text: 'text-xl font-inter-medium',
	},
	red: {
		container: `${defaultStyle} bg-red-50`,
		text: 'text-red-500 text-xl font-inter-medium',
	},
	gradient: {
		container: `${defaultStyle} overflow-hidden`,
		text: 'text-white text-xl font-inter-medium',
	},
}

type ButtonProps = {
	title: string
	onPress: () => void
	variant?: ButtonVariant
	className?: string
} & TouchableOpacityProps

export function Button({ title, onPress, variant, className, children, ...rest }: ButtonProps) {
	if (variant === 'gradient') {
		return (
			<TouchableOpacity
				onPress={onPress}
				className={`${buttonVariants.gradient.container} ${className}`}
				{...rest}
			>
				<LinearGradient
					colors={['#B73131', '#EAA233']}
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.5 }}
					className="h-full w-full items-center justify-center"
				>
					{children}
					<Text className={buttonVariants.gradient.text}>{title}</Text>
				</LinearGradient>
			</TouchableOpacity>
		)
	}
	return (
		<TouchableOpacity
			onPress={onPress}
			className={
				`${variant ? buttonVariants[variant].container : buttonVariants['default'].container}` +
				` ${className}`
			}
			{...rest}
		>
			{children}
			<Text
				className={
					variant ? `${buttonVariants[variant].text}` : `${buttonVariants['default'].text}`
				}
			>
				{title}
			</Text>
		</TouchableOpacity>
	)
}
