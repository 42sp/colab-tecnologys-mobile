import { Modal, View, Text, TouchableOpacity, Pressable, Animated, Easing } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { FilterType } from './home'
import { CustomCalendar, DateRangeType } from '@/components/ui/calendar'
import { useEffect, useState, useRef } from 'react'
import { FadeBackgroundModal } from '@/components/ui/fade-background-modal'

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

	const [showFilter, setShowFilter] = useState(isVisible)
	const slideCustom = useRef(new Animated.Value(0)).current
	useEffect(() => {
		if (isVisible) {
			setShowFilter(true)
			slideCustom.setValue(500)
			Animated.timing(slideCustom, {
				toValue: 0,
				duration: 500,
				easing: Easing.out(Easing.ease),
				useNativeDriver: true,
			}).start()
		} else {
			Animated.timing(slideCustom, {
				toValue: 500,
				duration: 500,
				easing: Easing.in(Easing.ease),
				useNativeDriver: true,
			}).start(() => setShowFilter(false))
		}
	}, [isVisible])

	const handleFadeOut = () => {
		if (!isVisible) setShowFilter(false)
	}

	if (!showFilter) return null

	return (
		<Modal visible={showFilter} animationType="none" transparent={true}>
			<FadeBackgroundModal visible={isVisible} onHidden={handleFadeOut} />
			{isVisible && (
				<Pressable className="flex-1 justify-end" onPress={onClose}>
					<View className="rounded-t-2xl bg-white p-5 pb-10">
						<Animated.View
							className="gap-4"
							style={{
								transform: [{ translateY: slideCustom }],
							}}
						>
							<View className="flex-row items-center justify-between">
								<Text className="font-inter-bold text-xl">Filtrar por</Text>
								<TouchableOpacity activeOpacity={0.5} onPress={() => onResetFilter()}>
									<Text className="font-inter text-blue-500">Limpar</Text>
								</TouchableOpacity>
							</View>

							<View className="gap-2">
								<Text className="font-inter-medium">Status</Text>
								<View className="flex-row gap-2">
									{(['pending', 'completed'] as StatusType[]).map((status) => {
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
								onPress={() =>
									hiddenCalendar ? setHiddenCalendar(false) : setHiddenCalendar(true)
								}
							>
								<Text className="mb-2 font-inter-medium">Selecionar período</Text>
								<View className="flex-row gap-2 space-x-2">
									<View className="flex-1 flex-row items-center justify-between rounded-lg border p-2">
										<Text>
											{dateRange.start ? dateRange.start.toLocaleDateString('pt-BR') : ''}
										</Text>
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
						</Animated.View>
					</View>
				</Pressable>
			)}
		</Modal>
	)
}
