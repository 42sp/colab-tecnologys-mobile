import { Modal, Text, View, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import Card from './card'
import { FadeBackgroundModal } from './fade-background-modal'

type ErrorModalProps = {
	visible: boolean
	message: string
	description?: string
	onClose: () => void
}

export function ErrorModal({ visible, message, description, onClose }: ErrorModalProps) {
	const [showCard, setShowCard] = useState(visible)
	useEffect(() => {
		if (visible) setShowCard(true)
	}, [visible])

	const handleFadeOut = () => {
		if (!visible) setShowCard(false)
	}

	if (!showCard) return null

	return (
		<Modal animationType="none" transparent={true} visible={showCard} onRequestClose={onClose}>
			<View className="flex-1 justify-end">
				<FadeBackgroundModal visible={visible} onHidden={handleFadeOut} />
				{visible && (
					<View className="p-10">
						<Card className="w-full">
							<View className="flex-row justify-between">
								<Text className="font-inter-bold text-lg text-red-700">{message}</Text>
								<TouchableOpacity onPress={onClose} hitSlop={10}>
									<Feather name="x" size={20} color="#333" />
								</TouchableOpacity>
							</View>
							{description && (
								<Text className="text-md font-inter text-gray-700">{description}</Text>
							)}
						</Card>
					</View>
				)}
			</View>
		</Modal>
	)
}
