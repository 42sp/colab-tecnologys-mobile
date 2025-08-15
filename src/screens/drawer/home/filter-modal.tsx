import { Modal, View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { useForm, Controller } from 'react-hook-form'
import { FilterType, StatusType } from './home'
import CustomCalendar from '@/components/ui/calendar'

type FilterModalProps = {
	isVisible: boolean
	onClose: () => void
	filter: FilterType | undefined
	setFilter: React.Dispatch<React.SetStateAction<FilterType | undefined>>
}

export function HomeFilterModal({ isVisible, onClose, setFilter, filter }: FilterModalProps) {
	function handleFilterChange(newFilter: Partial<FilterType>) {
		setFilter((prev) => ({ ...prev, ...newFilter }))
	}

	function resetFilters() {
		handleFilterChange({ dateRange: { start: new Date(), end: new Date() }, status: [] })
	}

	const statusLabels: Record<StatusType, string> = {
		pending: 'Pendente',
		approved: 'Aprovado',
		completed: 'Concluído',
	}

	return (
		<Modal visible={isVisible} animationType="slide" transparent>
			<Pressable className="flex-1" onPress={() => onClose()}>
				<View className="rounded-t-2xl bg-white p-4">
					<View className="mb-4 flex-row items-center justify-between">
						<Text className="font-inter-bold text-xl">Filter by</Text>
						<TouchableOpacity activeOpacity={0.5} onPress={() => resetFilters()}>
							<Text className="p-4 font-inter text-blue-500">Reset All</Text>
						</TouchableOpacity>
					</View>

					<View className="flex-1">
						<View className="mb-2 flex-row items-center justify-between">
							<Text className="mb-2 font-inter-medium">Status</Text>
						</View>

						<View className="flex-row gap-2">
							{(['pending', 'approved', 'completed'] as StatusType[]).map((status) => {
								const isSelected = filter?.status?.includes(status)
								return (
									<Button
										className="flex-1"
										key={status}
										variant={isSelected ? 'selected' : 'select'}
										title={statusLabels[status]}
										onPress={() => {
											setFilter((prev) => {
												if (!prev) return { status: [status] }

												const alreadySelected = prev.status?.includes(status)
												const updatedStatus = alreadySelected
													? prev.status?.filter((s) => s !== status)
													: [...(prev.status ?? []), status]

												return { ...prev, status: updatedStatus }
											})
										}}
									/>
								)
							})}
						</View>
					</View>
					<View className="flex-1">
						<CustomCalendar />
					</View>
				</View>
			</Pressable>
		</Modal>
	)
}
