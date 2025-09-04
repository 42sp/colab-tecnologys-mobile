import { Feather } from '@expo/vector-icons'
import { Pressable, TextInputProps, View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

type DropdownVariant = 'default' | 'outline' | 'red' | 'error'

const baseStyle = 'h-14 w-full flex-row items-center bg-transparent rounded-lg'

const dropdownVariants: Record<DropdownVariant, { container: string; text: string }> = {
	default: {
		container: `${baseStyle} border border-neutral-300`,
		text: `font-inter text-neutral-400`,
	},
	outline: {
		container: `${baseStyle} border border-neutral-300`,
		text: `font-inter text-neutral-400`,
	},
	red: {
		container: `${baseStyle} bg-red-50`,
		text: 'text-red-500 text-xl font-inter-medium',
	},
	error: {
		container: `${baseStyle} border-2 border-red-400`,
		text: 'text-red-500 font-inter',
	},
}

export interface ItemType {
	label: string
}

interface DropdownProps extends TextInputProps {
	IconLeft?: keyof typeof Feather.glyphMap
	IconRight?: keyof typeof Feather.glyphMap
	iconColor?: string
	className?: string
	placeholder?: string
	options: ItemType[]
	variant?: DropdownVariant
	value?: string
	onChangeText?: (text: string) => void
	hasError?: boolean
}

export function Dropdown({
	IconLeft,
	IconRight,
	iconColor,
	className,
	options,
	placeholder,
	variant = 'default',
	value,
	onChangeText,
	hasError = false,
}: DropdownProps) {
	const [open, setOpen] = useState(false)

	const containerStyle = dropdownVariants[variant].container
	const textStyle = dropdownVariants[variant].text

	const errorClass = hasError ? dropdownVariants['error'].container : ''
	const errorText = hasError ? dropdownVariants['error'].text : ''

	const iconColorStyle = hasError ? '#ef4444' : iconColor ? iconColor : '#d4d4d4'

	return (
		<Pressable
			onPress={() => (open === true ? setOpen(false) : setOpen(true))}
			className={`w-full ${className}`}
		>
			<View className={`px-4 ${containerStyle} ${errorClass} ${className}`}>
				{IconLeft && <Feather name={IconLeft} size={20} color={iconColorStyle} />}

				<Text className={`flex-1 px-3 ${textStyle} ${errorText} ${className}`}>
					{value || placeholder}
				</Text>

				{IconRight && <Feather name={IconRight} size={20} color={iconColorStyle} />}
			</View>

			{open && (
				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{ paddingVertical: 4 }}
					className="rounded-lg border border-neutral-300"
				>
					{options.map((item) => (
						<TouchableOpacity
							key={item.label}
							className="w-full bg-white px-4 py-3 hover:bg-neutral-100"
							onPress={() => {
								onChangeText?.(item.label)
								setOpen(false)
							}}
						>
							<Text className="text-base text-neutral-800">{item.label}</Text>
						</TouchableOpacity>
					))}
				</ScrollView>
			)}
		</Pressable>
	)
}
