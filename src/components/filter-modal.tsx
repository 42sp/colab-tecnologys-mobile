import { Modal, View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Button } from './ui/button'
import { useForm, Controller } from 'react-hook-form'

interface FilterModalProps {
	visible: boolean
	onClose: () => void
	onApply: (filters: { startDate: Date; endDate: Date; status: string[] }) => void
}

type FormValues = {
	startDate: Date
	endDate: Date
	status: string[]
}

export const FilterModal = ({ visible, onClose, onApply }: FilterModalProps) => {
	const today = new Date()
	const statusOptions = [
		{ value: 'pending', label: 'Pending' },
		{ value: 'approved', label: 'Approved' },
		{ value: 'completed', label: 'Completed' },
	]

	const { control, setValue, reset, handleSubmit } = useForm<FormValues>({
		defaultValues: {
			startDate: today,
			endDate: today,
			status: [],
		},
	})

	const handleQuickDate = (type: 'today' | 'week' | 'month') => {
		const now = new Date()
		if (type === 'today') {
			setValue('startDate', now)
			setValue('endDate', now)
		} else if (type === 'week') {
			const weekAgo = new Date(now)
			weekAgo.setDate(now.getDate() - 7)
			setValue('startDate', weekAgo)
			setValue('endDate', now)
		} else if (type === 'month') {
			const monthAgo = new Date(now)
			monthAgo.setMonth(now.getMonth() - 1)
			setValue('startDate', monthAgo)
			setValue('endDate', now)
		}
	}

	const resetFilters = () => {
		reset({
			startDate: today,
			endDate: today,
			status: [],
		})
	}

	const onSubmit = (data: FormValues) => {
		onApply({
			startDate: data.startDate,
			endDate: data.endDate,
			status: data.status.length > 0 ? data.status : ['pending', 'approved', 'completed'],
		})
		onClose()
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
								<TouchableOpacity
									activeOpacity={0.5}
									onPress={() => {
										setValue('startDate', today)
										setValue('endDate', today)
									}}
								>
									<Text className="font-inter text-blue-500">Reset</Text>
								</TouchableOpacity>
							</View>

							<View className="flex-row gap-2 space-x-2">
								<Controller
									control={control}
									name="startDate"
									render={({ field: { value } }) => (
										<View className="flex-1 flex-row items-center justify-between rounded-lg border p-2">
											<Text>{value.toLocaleDateString()}</Text>
											<Feather name="calendar" size={16} />
										</View>
									)}
								/>
								<Controller
									control={control}
									name="endDate"
									render={({ field: { value } }) => (
										<View className="flex-1 flex-row items-center justify-between rounded-lg border p-2">
											<Text>{value.toLocaleDateString()}</Text>
											<Feather name="calendar" size={16} />
										</View>
									)}
								/>
							</View>

							<View className="my-4 flex-row gap-2">
								<Button
									title="Today"
									variant="select"
									className="flex-1"
									onPress={() => handleQuickDate('today')}
								/>
								<Button
									title="This week"
									variant="select"
									className="flex-1"
									onPress={() => handleQuickDate('week')}
								/>
								<Button
									title="This month"
									variant="select"
									className="flex-1"
									onPress={() => handleQuickDate('month')}
								/>
							</View>
						</View>

						<View>
							<View className="mb-2 flex-row items-center justify-between">
								<Text className="mb-2 font-semibold">Status</Text>
								<TouchableOpacity activeOpacity={0.5} onPress={() => setValue('status', [])}>
									<Text className="font-inter text-blue-500">Reset</Text>
								</TouchableOpacity>
							</View>

							<Controller
								control={control}
								name="status"
								render={({ field: { value } }) => (
									<View className="flex-row gap-2">
										{statusOptions.map((status) => (
											<Button
												variant={value.includes(status.value) ? 'selected' : 'select'}
												title={status.label}
												key={status.value}
												onPress={() => {
													if (value.includes(status.value)) {
														setValue(
															'status',
															value.filter((s: string) => s !== status.value),
														)
													} else {
														setValue('status', [...value, status.value])
													}
												}}
												className="flex-1"
											/>
										))}
									</View>
								)}
							/>
						</View>

						<View className="mt-6 flex-row justify-between">
							<Button
								title="Reset All"
								variant="red"
								onPress={resetFilters}
								className="mr-2 flex-1"
							/>

							<Button
								title="Apply Filters"
								variant="gradient"
								onPress={handleSubmit(onSubmit)}
								className="ml-2 flex-1"
							/>
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	)
}
