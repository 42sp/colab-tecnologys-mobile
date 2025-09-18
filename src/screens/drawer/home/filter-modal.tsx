import { Modal, View, Text, ScrollView, TouchableOpacity, Pressable } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { FilterType } from './home'
import { CustomCalendar, DateRangeType } from '@/components/ui/calendar'
import { useEffect, useState } from 'react'

type FilterModalProps = {
	isVisible: boolean
	onClose: () => void
	filter: FilterType
	setFilter: React.Dispatch<React.SetStateAction<FilterType>>
}

export function HomeFilterModal({ isVisible, onClose, setFilter, filter }: FilterModalProps) {
	const [dateRange, setDateRange] = useState<DateRangeType>({ start: null, end: null })
	const [hiddenCalendar, setHiddenCalendar] = useState(true)

	const statusLabels: Record<'pending' | 'approved' | 'completed', string> = {
		pending: 'Pendente',
		approved: 'Aprovado',
		completed: 'Concluído',
	}

	function onResetFilter() {
		setDateRange({ start: null, end: null })
		setFilter({
			serviceType: 'Todos',
			status: [],
			dateRange: { start: null, end: null },
		})
	}

	useEffect(() => {
		if (dateRange.end) setHiddenCalendar(true)
		setFilter((prev) => ({ ...prev, dateRange }))
	}, [dateRange.end])

	return (
		<Modal visible={isVisible} animationType="slide" transparent>
			<Pressable className="flex-1 justify-end bg-black/15" onPress={onClose}>
				<View className="gap-2 rounded-t-2xl bg-white p-4">
					<View className="flex-row items-center justify-between">
						<Text className="font-inter-bold text-xl">Filtrar por</Text>
						<TouchableOpacity activeOpacity={0.5} onPress={() => onResetFilter()}>
							<Text className="p-4 font-inter text-blue-500">Limpar</Text>
						</TouchableOpacity>
					</View>

					<View className="gap-2">
						<Text className="font-inter-medium">Status</Text>
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

					<Pressable
						onPress={() => (hiddenCalendar ? setHiddenCalendar(false) : setHiddenCalendar(true))}
					>
						<Text className="mb-2 font-inter-medium">Selecionar período</Text>
						<View className="flex-row gap-2 space-x-2">
							<View className="flex-1 flex-row items-center justify-between rounded-lg border p-2">
								<Text>{dateRange.start ? dateRange.start.toLocaleDateString('pt-BR') : ''}</Text>
								<Feather name="calendar" size={16} />
							</View>
							<View className="flex-1 flex-row items-center justify-between rounded-lg border p-2">
								<Text>{dateRange.end ? dateRange.end.toLocaleDateString('pt-BR') : ''}</Text>
								<Feather name="calendar" size={16} />
							</View>
						</View>
					</Pressable>
					<View className={`${hiddenCalendar ? 'hidden' : ''}`}>
						<CustomCalendar setDateRange={setDateRange} />
					</View>
				</View>
			</Pressable>
		</Modal>
	)
}
