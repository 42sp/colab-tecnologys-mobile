import { Modal, View, ActivityIndicator, Platform } from 'react-native'

interface LoadingModalProps {
	visible: boolean
}

export function LoadingModal({ visible }: LoadingModalProps) {
	const getSize = Platform.OS === 'ios' ? 'large' : 60
	return (
		<Modal transparent animationType="none" visible={visible}>
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size={getSize} color="#FF6700" />
			</View>
		</Modal>
	)
}
