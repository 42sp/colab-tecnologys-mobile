import { Feather } from '@expo/vector-icons'
import {
	Pressable,
	TextInputProps,
	View,
	Text,
	TouchableOpacity,
	TouchableOpacityProps,
	Modal,
	FlatList,
} from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

type DropdownVariant = 'default' | 'outline' | 'red'

const defaultStyle = 'h-16 w-full items-center justify-center rounded-xl flex-row'

const dropdownVariants: Record<DropdownVariant, { container: string; text: string }> = {
	default: {
		container: `${defaultStyle} bg-black`,
		text: 'text-neutral-100 text-xl font-inter-medium',
	},
	outline: {
		container: `${defaultStyle} bg-transparent border-2 border-gray-200 outline-solid`,
		text: `font-inter text-neutral-400`,
	},
	red: {
		container: `${defaultStyle} bg-red-50`,
		text: 'text-red-500 text-xl font-inter-medium',
	},
}

interface DropdownProps extends TextInputProps {
	IconLeft?: keyof typeof Feather.glyphMap
	IconRight?: keyof typeof Feather.glyphMap
	iconColor?: string
	className?: string
	placeholder?: string
	options: { label: string }[]
	variant?: DropdownVariant
}

export function Dropdown({
	IconLeft,
	IconRight,
	iconColor,
	className,
	options,
	placeholder,
	variant,
}: DropdownProps) {
	const [open, setOpen] = useState(false)

	const [selected, setSelected] = useState('')

	return (
		<Pressable
			onPress={() => (open === true ? setOpen(false) : setOpen(true))}
			className={`w-full ${className}`}
		>
			<View
				className={`h-14 w-full flex-row items-center justify-between gap-3 rounded-lg border border-neutral-300 px-4 text-neutral-700 ${className}`}
			>
				{IconLeft && (
					<Feather name={IconLeft} size={20} color={iconColor ? iconColor : '#d4d4d4'} />
				)}

				<Text
					className={` flex-1 ${variant ? dropdownVariants[variant].text : dropdownVariants['default'].text} + ${className}`}
				>
					{selected || placeholder}
				</Text>

				{IconRight && (
					<Feather name={IconRight} size={20} color={iconColor ? iconColor : '#d4d4d4'} />
				)}
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
								setSelected(item.label)
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
