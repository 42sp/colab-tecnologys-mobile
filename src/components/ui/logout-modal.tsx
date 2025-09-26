import { Modal, View, Text, TouchableOpacity } from 'react-native'
import { Button } from './button'
import Card from './card'
import { Feather } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { FadeBackgroundModal } from './fade-background-modal'

interface LogoutModalProps {
	visible: boolean
	onClose: () => void
	onConfirm: () => void
}

export function LogoutModal({ visible, onClose, onConfirm }: LogoutModalProps) {
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
			<View className="flex-1 items-center justify-end bg-black/40">
				<FadeBackgroundModal visible={visible} onHidden={handleFadeOut} />
				{visible && (
					<Card className="m-10 w-10/12 gap-4 p-4">
						<Text className="font-inter-bold text-lg text-red-700">Sair</Text>
						<Text className="text-md font-inter text-gray-700">
							Tem certeza que deseja sair de sua conta?
						</Text>
						<View className="h-12 flex-row justify-between">
							<Button
								title="Não"
								variant="pill"
								className=" w-32 justify-center border border-red-700"
								onPress={onClose}
							/>
							<Button
								title="Sim"
								variant="pill"
								className="w-32 flex-row justify-center gap-2 border border-green-700"
								onPress={onConfirm}
							>
								<Feather name="log-out" size={14} />
							</Button>
						</View>
					</Card>
				)}
			</View>
		</Modal>
	)
}
