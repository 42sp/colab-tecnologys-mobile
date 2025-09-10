import { Modal, View, Text } from 'react-native'
import { Button } from './button'
import Card from './card'
import { Feather } from '@expo/vector-icons'

interface LogoutModalProps {
	visible: boolean
	onClose: () => void
	onConfirm: () => void
}

export function LogoutModal({ visible, onClose, onConfirm }: LogoutModalProps) {
	return (
		<Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
			<View className="flex-1 items-center justify-end bg-black/40">
				<Card className="m-4">
					<View className="pb-4">
						<Text className="text-md text-center font-inter text-black ">
							Tem certeza que deseja fazer logout?
						</Text>
					</View>
					<View className="flex-row justify-between px-4">
						<Button title="Não" variant="pill" className="w-24 bg-red-100" onPress={onClose} />
						<Button
							title="Sim"
							variant="pill"
							className="w-24 flex-row items-center gap-2 bg-green-100"
							onPress={onConfirm}
						>
							<Feather name="log-out" size={14} color={''} className="" />
						</Button>
					</View>
				</Card>
			</View>
		</Modal>
	)
}
