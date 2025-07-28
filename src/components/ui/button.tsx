import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ButtonVariant = 'default' | 'outline' | 'red'

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
}

type ButtonProps = {
	title: string
	onPress: () => void
	variant?: ButtonVariant
	className?: string
} & TouchableOpacityProps

export function Button({ title, onPress, variant, className, children, ...rest }: ButtonProps) {
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
