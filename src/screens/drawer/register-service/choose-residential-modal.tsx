import { Feather } from '@expo/vector-icons'
import { View, Text, Modal, FlatList, Pressable } from 'react-native'
import { Construction } from '@/api/get-constructions'

type Props = {
	visible: boolean
	onClose: () => void
	residentials: Construction[]
	onSelect: (index: number) => void
}

export function ChooseResidentialModal({ visible, onClose, residentials, onSelect }: Props) {
	return (
		<Modal visible={visible} transparent animationType="slide">
			<View className="flex-1 justify-center bg-black/40">
				<View className="mx-6 max-h-[80%] rounded-lg bg-white p-4">
					<View className="mb-3 flex-row items-center justify-between">
						<Text className="text-lg font-bold text-gray-800">Selecione o residencial</Text>
						<Pressable onPress={onClose}>
							<Feather name="x" size={24} color="#111827" />
						</Pressable>
					</View>

					<FlatList
						data={residentials}
						keyExtractor={(item) => String(item.id)}
						renderItem={({ item, index }) => (
							<Pressable className="border-b border-gray-200 p-3" onPress={() => onSelect(index)}>
								<Text className="text-gray-800">{item.name}</Text>
							</Pressable>
						)}
					/>
				</View>
			</View>
		</Modal>
	)
}
