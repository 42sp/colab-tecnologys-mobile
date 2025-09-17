import { Modal, View, ActivityIndicator } from 'react-native'

interface LoadingModalProps {
	visible: boolean
}

export function LoadingModal({ visible }: LoadingModalProps) {
	return (
		<Modal transparent animationType="none" visible={visible}>
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size={60} color="#FF6700" />
			</View>
		</Modal>
	)
}
