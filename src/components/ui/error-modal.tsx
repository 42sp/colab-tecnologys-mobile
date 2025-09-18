import { Modal, Text, Pressable, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

type ErrorModalProps = {
	visible: boolean
	message: string
	description?: string
	onClose: () => void
}

export function ErrorModal({ visible, message, description, onClose }: ErrorModalProps) {
	return (
		<Modal animationType="slide" transparent visible={visible} onRequestClose={onClose}>
			<View className="flex-1 justify-end bg-black/40">
				<View className="relative w-full rounded-t-2xl bg-white p-6 pt-12 shadow-2xl">
					<View className="absolute right-2 top-2">
						<Pressable onPress={onClose} className="p-3" hitSlop={10}>
							<Feather name="x" size={20} color="#333" />
						</Pressable>
					</View>

					<Text className="mb-2 pr-8 font-inter-bold text-lg text-[#B73131]">{message}</Text>
					{description ? (
						<Text className="font-inter text-base text-gray-700">{description}</Text>
					) : null}
				</View>
			</View>
		</Modal>
	)
}
