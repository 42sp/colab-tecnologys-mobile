import Card from '@/components/ui/card'
import { Dropdown } from '@/components/ui/dropdown'
import { Text, View, Modal, Pressable } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useState } from 'react'
import {
	Controller,
	type UseFormResetField,
	type Control,
	useWatch,
	FieldErrors,
} from 'react-hook-form'
import type { RegisterServiceType } from './register-service'
import { Feather } from '@expo/vector-icons'

type Props = {
	control: Control<RegisterServiceType>
	resetField: UseFormResetField<RegisterServiceType>
	currentResidential?: {
		id: number
		name: string
		torres: {
			total: number
			data: Array<{
				id: number
				name: string
				andares: {
					total: number
					data: Array<{ id: number; name: string; description?: string }>
				}
			}>
		}
	}
	errors: FieldErrors<RegisterServiceType>
}

export function RegisterServiceForm({ control, currentResidential, resetField, errors }: Props) {
	const today = new Date().toLocaleDateString('sv-SE')
	const [isCalendarVisible, setCalendarVisible] = useState(false)

	const towers = currentResidential?.torres?.data ?? []
	const towerOptions = towers.map((t) => ({ label: t.name }))

	const selectedTowerName = useWatch({ control, name: 'tower' }) as string
	const selectedTower = towers.find((t) => t.name === selectedTowerName)

	const totalFloors = selectedTower?.andares?.total ?? 0
	const floorOptions =
		totalFloors > 0
			? Array.from({ length: totalFloors }, (_, i) => ({ label: `${i + 1}º Floor` }))
			: []

	return (
		<View>
			<Card className="ml-6 mr-6 mt-6">
				<Card.Header>
					<Text className="font-inter-bold text-xl text-black">Date of execution</Text>
				</Card.Header>
				<Card.Body className="gap-2">
					<Text className="text-lg">Date</Text>
					<Controller
						control={control}
						name="dateOfService"
						render={({ field: { onChange, value } }) => {
							const formattedDate = value
								? new Date(`${value}T00:00:00`).toLocaleDateString('pt-BR')
								: ''

							return (
								<>
									<Pressable
										onPress={() => setCalendarVisible(true)}
										className={`h-14 w-full flex-row items-center rounded-lg border bg-transparent px-4 ${
											errors.dateOfService ? 'border-red-500' : 'border-neutral-300'
										}`}
									>
										<Feather
											name="calendar"
											size={20}
											color={errors.dateOfService ? '#ef4444' : '#d4d4d4'}
										/>
										<Text className={`flex-1 px-3 font-inter ${errors.dateOfService ? 'text-red-500' : 'text-neutral-400'
											} `}>
											{formattedDate || 'Date of service'}
										</Text>

									</Pressable>

									<Modal visible={isCalendarVisible} transparent animationType="slide">
										<View className="flex-1 items-center justify-center bg-black/40 p-4">
											<View className="w-full rounded-lg bg-white p-4">
												<Calendar
													minDate={today}
													onDayPress={(day) => {
														onChange(day.dateString)
														setCalendarVisible(false)
													}}
													markedDates={{
														[value]: { selected: true, disableTouchEvent: true },
													}}
													theme={{
														selectedDayBackgroundColor: '#000',
														todayTextColor: '#Ef4444',
														arrowColor: '#000',
													}}
												/>
												<Pressable
													onPress={() => setCalendarVisible(false)}
													className="mt-4 items-center rounded-lg border-2 border-gray-200 bg-transparent p-3"
												>
													<Text className="font-inter-bold text-black">Close</Text>
												</Pressable>
											</View>
										</View>
									</Modal>
								</>
							)
						}}
					/>
					{errors.dateOfService && (
						<Text className="text-red-500">{errors.dateOfService.message}</Text>
					)}
				</Card.Body>
			</Card>
			<Card className="ml-6 mr-6 mt-6">
				<Card.Header>
					<Text className="font-inter-bold text-xl text-black">Local Information</Text>
				</Card.Header>
				<Card.Body className="gap-2">
					<Text className="text-lg">Tower / Block</Text>
					<Controller
						control={control}
						name="tower"
						render={({ field: { onChange, value } }) => (
							<Dropdown
								IconLeft={'calendar'}
								IconRight={'chevron-down'}
								className="self-center"
								options={towerOptions}
								variant="outline"
								placeholder="Select the block"
								value={value}
								onChangeText={(val: string) => {
									resetField('floor')
									onChange(val)
								}}
								hasError={!!errors.tower}
							/>
						)}
					/>
					{errors.tower && <Text className="text-red-500">{errors.tower.message}</Text>}
					<Text className="mt-4 text-lg">Floor</Text>
					<Controller
						control={control}
						name="floor"
						render={({ field: { onChange, value } }) => (
							<Dropdown
								IconLeft={'calendar'}
								IconRight={'chevron-down'}
								className="self-center"
								options={floorOptions}
								variant="outline"
								placeholder="Select a floor"
								value={value}
								onChangeText={onChange}
								hasError={!!errors.floor}
							/>
						)}
					/>
					{errors.floor && <Text className="text-red-500">{errors.floor.message}</Text>}
				</Card.Body>
			</Card>
		</View>
	)
}
