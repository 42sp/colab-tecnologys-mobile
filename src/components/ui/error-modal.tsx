import { Modal, Text, View, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import Card from './card'

type ErrorModalProps = {
	visible: boolean
	message: string
	description?: string
	onClose: () => void
}

export function ErrorModal({ visible, message, description, onClose }: ErrorModalProps) {
	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
			<View className="w-full flex-1 items-center justify-end bg-black/40 p-10">
				<Card className="w-full ">
					<View className="flex-row justify-between ">
						<Text className="font-inter-bold text-lg text-red-700">{message}</Text>
						<TouchableOpacity onPress={onClose} hitSlop={10}>
							<Feather name="x" size={20} color="#333" />
						</TouchableOpacity>
					</View>
					{description ? (
						<Text className="text-md font-inter text-gray-700">{description}</Text>
					) : null}
				</Card>
			</View>
		</Modal>
	)
}
