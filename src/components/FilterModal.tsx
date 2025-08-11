import { Modal, View, Text, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { Button } from './ui/button'

interface FilterModalProps {
	visible: boolean
	onClose: () => void
	onApply: (filters: { startDate: Date; endDate: Date; status: string[] }) => void
}

export const FilterModal = ({ visible, onClose, onApply }: FilterModalProps) => {
	const today = new Date()
	const [startDate, setStartDate] = useState<Date>(today)
	const [endDate, setEndDate] = useState<Date>(today)
	const [selectedStatus, setSelectedStatus] = useState<string[]>([])

	const statusOptions = [
		{ value: 'pending', label: 'Pending' },
		{ value: 'approved', label: 'Approved' },
		{ value: 'completed', label: 'Completed' },
	]

	const handleQuickDate = (type: 'today' | 'week' | 'month') => {
		const now = new Date()
		if (type === 'today') {
			setStartDate(now)
			setEndDate(now)
		} else if (type === 'week') {
			const weekAgo = new Date(now)
			weekAgo.setDate(now.getDate() - 7)
			setStartDate(weekAgo)
			setEndDate(now)
		} else if (type === 'month') {
			const monthAgo = new Date(now)
			monthAgo.setMonth(now.getMonth() - 1)
			setStartDate(monthAgo)
			setEndDate(now)
		}
	}

	const toggleStatus = (value: string) => {
		setSelectedStatus((prev) =>
			prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value],
		)
	}

	const resetFilters = () => {
		setStartDate(today)
		setEndDate(today)
		setSelectedStatus([])
	}

	return (
		<Modal visible={visible} animationType="slide" transparent>
			<View className="flex-1 justify-end">
				<View className="rounded-t-2xl bg-white p-4">
					<View className="mb-4 flex-row items-center justify-between">
						<Text className="text-xl font-bold">Filter by</Text>

						<TouchableOpacity onPress={onClose}>
							<Feather name="x" size={24} />
						</TouchableOpacity>
					</View>

					<ScrollView className="space-y-4" showsVerticalScrollIndicator={false}>
						<View>
							<View className="mb-2 flex-row items-center justify-between">
								<Text className="font-inter-medium">Date</Text>

								<TouchableOpacity activeOpacity={0.5} onPress={() => setStartDate(today)}>
									<Text className="font-inter text-blue-500">Reset</Text>
								</TouchableOpacity>
							</View>

							<View className="flex-row gap-2 space-x-2">
								<View className="flex-1 flex-row items-center justify-between rounded-lg border p-2">
									<Text>{startDate.toLocaleDateString()}</Text>

									<Feather name="calendar" size={16} />
								</View>

								<View className="flex-1 flex-row items-center justify-between rounded-lg border p-2">
									<Text>{endDate.toLocaleDateString()}</Text>

									<Feather name="calendar" size={16} />
								</View>
							</View>

							<View className="my-4 flex-row gap-2">
								<Button title='Today' variant="select" className="flex-1" onPress={() => handleQuickDate('today')} />

								<Button title='This week' variant="select" className="flex-1" onPress={() => handleQuickDate('week')} />

								<Button title='This month' variant="select" className="flex-1" onPress={() => handleQuickDate('month')} />
							</View>
						</View>

						<View>
							<View className="mb-2 flex-row items-center justify-between">
								<Text className="mb-2 font-semibold">Status</Text>

								<TouchableOpacity activeOpacity={0.5} onPress={() => setSelectedStatus([])}>
									<Text className="font-inter text-blue-500">Reset</Text>
								</TouchableOpacity>
							</View>

							<View className="flex-row gap-2">
								{statusOptions.map((status) => (
									<Button
										variant={selectedStatus.includes(status.value) ? 'selected' : 'select'}
										title={status.label}
										key={status.value}
										onPress={() => toggleStatus(status.value)}
										className='flex-1'/>
								))}
							</View>
						</View>

						<View className="mt-6 flex-row justify-between">
							<Button
								title="Reset All"
								variant="red"
								onPress={resetFilters}
								className="flex-1 mr-2"
							/>

							<Button
								title="Apply Filters"
								variant="gradient"
								onPress={() => {
									onApply({
										startDate,
										endDate,
										status: selectedStatus.length > 0 ? selectedStatus : ['pending', 'approved', 'completed'],
									})
									onClose()
								}}
								className="flex-1 ml-2"
							/>
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}
