import Card from '@/components/ui/card'
import { Dropdown } from '@/components/ui/dropdown'
import { Text, View, Pressable } from 'react-native'
import { useState, useEffect, useMemo } from 'react'
import {
	Controller,
	type UseFormResetField,
	type UseFormSetValue,
	type Control,
	useWatch,
	FieldErrors,
} from 'react-hook-form'
import type { RegisterServiceType } from './register-service'
import { Feather } from '@expo/vector-icons'
import { DateRangeType } from '@/components/ui/calendar'
import { Services } from '@/api/get-services'
import { CalendarModal } from './calendar-modal'

type Props = {
	control: Control<RegisterServiceType>
	resetField: UseFormResetField<RegisterServiceType>
	services: Services[]
	reset: () => void
	setValue: UseFormSetValue<RegisterServiceType>
	errors: FieldErrors<RegisterServiceType>
}

export function RegisterServiceForm({ control, services, resetField, setValue, errors }: Props) {
	const [isCalendarVisible, setCalendarVisible] = useState(false)
	const [selectDay, setSelectDay] = useState<DateRangeType>({ start: null, end: null })

	const selectedTower = useWatch({ control, name: 'tower' })

	const towerOptions = useMemo(() => {
		return [...new Set(services.map((s) => s.tower?.toString().trim()))]
			.filter(Boolean)
			.map((tower) => ({
				label: `${tower}`,
				value: tower,
			}))
	}, [services])

	const floorOptions = useMemo(() => {
		if (!selectedTower) return []

		const filtered = services.filter(
			(s) => s.tower?.toString().trim() === selectedTower?.toString().trim(),
		)

		const uniqueFloors = [...new Set(filtered.map((s) => s.floor?.toString().trim()))]
			.filter(Boolean)
			.map((floor) => ({
				label: floor,
				value: floor,
			}))

		return uniqueFloors.sort((a, b) => Number(a.label.split(' ')[1]) - Number(b.label.split(' ')[1]))
	}, [selectedTower, services])

	useEffect(() => {
		if (selectDay.start && !selectDay.end) {
			setValue('dateOfService', selectDay.start.toISOString().split('T')[0])
			setCalendarVisible(false)
		}
	}, [selectDay])

	return (
		<View className="gap-5">
			<Card>
				<Card.Header>
					<Text className="font-inter-bold text-xl text-black">Data da execução</Text>
				</Card.Header>
				<Card.Body className="gap-2">
					<Text className="text-lg">Data</Text>
					<Controller
						control={control}
						name="dateOfService"
						render={({ field: { value } }) => {
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
										<Text
											className={`flex-1 px-3 font-inter ${
												errors.dateOfService ? 'text-red-500' : 'text-black'
											} `}
										>
											{formattedDate || 'Data do serviço'}
										</Text>
									</Pressable>
									<CalendarModal
										visible={isCalendarVisible}
										onClose={() => setCalendarVisible(false)}
										setDateRange={setSelectDay}
									/>
								</>
							)
						}}
					/>
					{errors.dateOfService && (
						<Text className="text-red-500">{errors.dateOfService.message}</Text>
					)}
				</Card.Body>
			</Card>
			<Card>
				<Card.Header>
					<Text className="font-inter-bold text-xl text-black">Informação do Local</Text>
				</Card.Header>
				<Card.Body className="gap-2">
					<Text className="text-lg">Torre</Text>
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
								placeholder="Selecione a torre"
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
					<Text className="mt-4 text-lg">Pavimento</Text>
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
								placeholder="Selecione o andar"
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
