import { Modal, Pressable, Text, View } from 'react-native'
import { CustomCalendar, DateRangeType } from '@/components/ui/calendar'
import { FadeBackgroundModal } from '@/components/ui/fade-background-modal'
import { useEffect, useState } from 'react'

type CalendarModalProps = {
	visible: boolean
	onClose: () => void
	setDateRange: (range: DateRangeType) => void
}

export function CalendarModal({ visible, onClose, setDateRange }: CalendarModalProps) {
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
			<View className="flex-1 items-center justify-center p-4">
				<FadeBackgroundModal visible={visible} onHidden={handleFadeOut} />
				{visible && (
					<View className="w-full rounded-lg bg-white p-4">
						<CustomCalendar setDateRange={setDateRange} markingType="dot" />
						<Pressable
							onPress={onClose}
							className="mt-4 items-center rounded-lg border-2 border-gray-200 bg-transparent p-3"
						>
							<Text className="font-inter-bold text-black">Fechar</Text>
						</Pressable>
					</View>
				)}
			</View>
		</Modal>
	)
}
