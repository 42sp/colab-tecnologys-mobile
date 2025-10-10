import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { CircleX, ClosedCaption, CopyMinus, Divide, FolderClosed, PanelLeftClose, SidebarClose, X } from 'lucide-react-native'

interface TableListProps {
	options: string[]
	onChange?: (newOptions: string[]) => void
	title?: React.ReactNode
}

export function TableList({ title, options, onChange }: TableListProps) {
	const [items, setItems] = useState<string[]>([])

	useEffect(() => {
		setItems(options)
	}, [options])

	const removeItem = (itemToRemove: string) => {
		const updated = items.filter((item) => item !== itemToRemove)
		setItems(updated)
		onChange?.(updated)
	}

	return (
		<View className="gap-4 ">
			{title}
			<View className="flex-row flex-wrap gap-2 ">
				{items.map((item) => (
					<Button
						key={item}
						variant="redPill"
						className="flex-row justify-center"
						onPress={() => removeItem(item)}
						accessibilityLabel={`Remover Apto ${item}`}
					>
						<Text className="pr-2 font-inter-bold text-lg text-black">Apto {item}</Text>
						<CircleX height={18} width={18} />
					</Button>
				))}
			</View>
		</View>
	)
}
