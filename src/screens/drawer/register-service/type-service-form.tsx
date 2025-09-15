import Card from '@/components/ui/card'
import { Dropdown } from '@/components/ui/dropdown'
import {
	Controller,
	useWatch,
	type Control,
	type FieldErrors,
	type UseFormResetField,
} from 'react-hook-form'
import { Text, View, Pressable } from 'react-native'
import { RadioCheckOption } from '@/components/ui/input-radio'
import { TableList } from '@/components/ui/table-list'
import { useState, useMemo } from 'react'
import { Feather } from '@expo/vector-icons'
import type { RegisterServiceType } from './register-service'
import { Services } from '@/api/get-services'
import { ServiceTypes } from '@/api/get-service-types'

const radioOptions = [{ label: 'EXTERNA' }, { label: 'INTERNA' }]

type Props = {
	control: Control<RegisterServiceType>
	errors: FieldErrors<RegisterServiceType>
	resetField: UseFormResetField<RegisterServiceType>
	services: Services[]
	serviceTypes: ServiceTypes[]
}

const serviceMap: Record<string, string> = {
	C: 'Contrapiso',
	M: 'Marcação',
	E: 'Elevação',
	F: 'Fixação',
	EX: 'Serviço Extra',
}

export function TypeServiceForm({ control, errors, services, serviceTypes, resetField }: Props) {
	const selectedTower = useWatch({ name: 'tower', control })
	const selectedFloor = useWatch({ name: 'floor', control })
	const selectedServiceType = useWatch({ name: 'typeOfService', control })
	const selectedApartments = useWatch({ name: 'apartments', control })
	const selectedMeasurementUnit = useWatch({ name: 'measurementUnit', control })
	const selectedEnvironmentType = useWatch({ name: 'classification', control })
	const selectedService = useWatch({ name: 'services', control })
	const [selectedStage, setSelectedStage] = useState<string | null>(null)

	const serviceTypeOptions = useMemo(() => {
		if (!services.length || !serviceTypes.length) return []
		if (!selectedTower || !selectedFloor) return []

		const ids = new Set(
			services
				.filter(
					(s) =>
						s.tower?.toString().trim() === selectedTower?.toString().trim() &&
						s.floor?.toString().trim() === selectedFloor?.toString().trim(),
				)
				.map((s) => String(s.service_type_id).trim()),
		)

		return Array.from(ids).map((id) => {
			const type = serviceTypes.find((t) => String(t.id).trim() === id)
			return {
				label: type?.service_name || id,
				value: id,
			}
		})
	}, [services, serviceTypes, selectedTower, selectedFloor])

	const apartmentOptions = useMemo(() => {
		if (!selectedTower || !selectedFloor || !selectedServiceType) return []

		const filtered = services.filter(
			(s) =>
				s.tower?.toString().trim() === selectedTower?.toString().trim() &&
				s.floor?.toString().trim() === selectedFloor?.toString().trim() &&
				String(s.service_type_id).trim() === String(selectedServiceType).trim(),
		)

		const apartments = [
			...new Set(filtered.map((s) => s.apartment?.toString().trim()).filter(Boolean)),
		]

		return apartments.map((apartment) => ({
			label: apartment,
			value: apartment,
		}))
	}, [selectedTower, selectedFloor, selectedServiceType, services])

	const measurementUnitOptions = useMemo(() => {
		if (!selectedTower || !selectedFloor || !selectedServiceType || !selectedApartments) return []

		return [
			...new Set(
				services
					.filter(
						(s) =>
							s.tower?.toString().trim() === selectedTower &&
							s.floor?.toString().trim() === selectedFloor &&
							s.service_type_id?.toString().trim() === selectedServiceType &&
							selectedApartments.includes(s.apartment?.toString().trim() ?? ''),
					)
					.map((s) => s.measurement_unit?.toString().trim()),
			),
		]
			.filter(Boolean)
			.map((unit) => ({
				label: unit,
				value: unit,
			}))
	}, [selectedTower, selectedFloor, selectedServiceType, selectedApartments, services])

	const serviceOptions = useMemo(() => {
		if (
			!selectedTower ||
			!selectedFloor ||
			!selectedServiceType ||
			!selectedApartments?.length ||
			!selectedMeasurementUnit ||
			!selectedEnvironmentType
		)
			return []
		const filtered = services.filter(
			(s) =>
				s.tower?.toString().trim() === selectedTower &&
				s.floor?.toString().trim() === selectedFloor &&
				s.service_type_id?.toString().trim() === selectedServiceType &&
				selectedApartments.includes(s.apartment?.toString().trim() ?? '') &&
				s.measurement_unit?.toString().trim() === selectedMeasurementUnit &&
				s.environment_type?.toUpperCase() === selectedEnvironmentType.toUpperCase(),
		)

		const uniqueAcronyms = [...new Set(filtered.map((s) => s.acronym?.toString().trim()))].filter(
			Boolean,
		)

		const options = uniqueAcronyms.map((acronym) => ({
			label: serviceMap[acronym] || acronym,
			value: acronym,
		}))

		return options
	}, [
		selectedTower,
		selectedFloor,
		selectedServiceType,
		selectedApartments,
		selectedMeasurementUnit,
		selectedEnvironmentType,
		services,
	])

	const filteredServices = useMemo(() => {
		if (
			!selectedTower ||
			!selectedFloor ||
			!selectedServiceType ||
			!selectedApartments?.length ||
			!selectedMeasurementUnit ||
			!selectedEnvironmentType ||
			!selectedService
		)
			return []

		return services.filter(
			(s) =>
				s.tower?.toString().trim() === selectedTower &&
				s.floor?.toString().trim() === selectedFloor &&
				s.service_type_id?.toString().trim() === selectedServiceType &&
				selectedApartments.includes(s.apartment?.toString().trim() ?? '') &&
				s.measurement_unit?.toString().trim() === selectedMeasurementUnit &&
				s.environment_type?.toUpperCase() === selectedEnvironmentType.toUpperCase() &&
				s.acronym?.toString().trim() === selectedService,
		)
	}, [
		selectedTower,
		selectedFloor,
		selectedServiceType,
		selectedApartments,
		selectedMeasurementUnit,
		selectedEnvironmentType,
		selectedService,
		services,
	])

	return (
		<View>
			<Card className="ml-6 mr-6 mt-6">
				<Card.Header>
					<Text className="font-inter-bold text-xl text-black">Tipo de serviço</Text>
				</Card.Header>
				<Card.Body className="gap-2">
					<Controller
						control={control}
						name="typeOfService"
						render={({ field: { onChange, value } }) => (
							<Dropdown
								IconLeft={'list'}
								IconRight={'chevron-down'}
								options={serviceTypeOptions}
								variant="outline"
								placeholder="Selecione o tipo de serviço"
								value={serviceTypeOptions.find((opt) => opt.value === value)?.label || ''}
								onChangeText={(label) => {
									const matched = serviceTypeOptions.find((opt) => opt.label === label)
									const id = matched?.value ?? label
									onChange(id)
									resetField('apartments')
								}}
								hasError={!!errors.typeOfService}
							/>
						)}
					/>
					{errors.typeOfService && (
						<Text className="text-xs text-red-500">{errors.typeOfService.message}</Text>
					)}
					<Text className="mt-4 text-lg">Apartamentos</Text>
					<Controller
						control={control}
						name="apartments"
						render={({
							field: { value: selectedApartments = [], onChange: updateSelectedApartments },
						}) => {
							const addApartment = (label: string) => {
								const matched = apartmentOptions.find((opt) => opt.label === label)
								const val = matched?.value ?? label

								if (!val) return
								if (!selectedApartments.includes(val)) {
									updateSelectedApartments([...selectedApartments, val])
								}
							}

							return (
								<>
									<Dropdown
										IconLeft="list"
										IconRight="chevron-down"
										options={apartmentOptions}
										variant="outline"
										placeholder="Selecione os apartamentos"
										value=""
										onChangeText={addApartment}
										hasError={!!errors.apartments}
									/>

									{selectedApartments.length > 0 && (
										<View className="mt-4">
											<TableList options={selectedApartments} onChange={updateSelectedApartments} />
										</View>
									)}
								</>
							)
						}}
					/>
					{errors.apartments && (
						<Text className="text-xs text-red-500">{errors.apartments.message as string}</Text>
					)}

					<Controller
						control={control}
						name="measurementUnit"
						render={({ field: { onChange, value } }) => (
							<Dropdown
								IconLeft={'list'}
								IconRight={'chevron-down'}
								className="mt-2"
								options={measurementUnitOptions}
								variant="outline"
								placeholder="Selecione a unidade de medida"
								value={value}
								onChangeText={onChange}
								hasError={!!errors.measurementUnit}
							/>
						)}
					/>
					{errors.measurementUnit && (
						<Text className="text-xs text-red-500">{errors.measurementUnit.message}</Text>
					)}

					<Controller
						control={control}
						name="classification"
						render={({ field: { value, onChange } }) => (
							<View className=" mt-4 flex-row">
								{radioOptions.map((opt) => (
									<RadioCheckOption
										key={opt.label}
										label={opt.label}
										selected={value === opt.label}
										onPress={() => onChange(opt.label)}
										variant="radio"
									/>
								))}
							</View>
						)}
					/>
					{errors.classification && (
						<Text className="mb-2 text-xs text-red-500">
							{errors.classification.message as string}
						</Text>
					)}

					<Controller
						control={control}
						name="services"
						render={({ field: { onChange, value } }) => (
							<Dropdown
								IconLeft={'list'}
								IconRight={'chevron-down'}
								className="mt-2"
								options={serviceOptions}
								variant="outline"
								placeholder="Selecione os serviços"
								value={serviceOptions.find((opt) => opt.value === value)?.label || ''}
								onChangeText={(label) => {
									const matched = serviceOptions.find((opt) => opt.label === label)
									const val = matched?.value ?? label
									onChange(val)
								}}
								hasError={!!errors.services}
							/>
						)}
					/>

					{selectedService && (
						<View className="mt-4">
							{filteredServices
								.sort((a, b) => Number(a.stage) - Number(b.stage))
								.map((service) => {
									const isSelected = selectedStage === service.stage
									const serviceName = serviceMap[service.acronym] || service.acronym

									return (
										<Pressable
											key={service.id}
											onPress={() => setSelectedStage(service.stage)}
											className={`mt-2 flex-row items-center rounded-lg border p-4 ${
												isSelected ? 'border-red-500 bg-red-100' : 'border-neutral-300 bg-white'
											}`}
										>
											<Text
												className={`font-inter-bold text-2xl ${
													isSelected ? 'text-red-500' : 'text-black'
												}`}
											>
												{service.stage}
											</Text>

											<View className="flex-1 px-4">
												<Text
													className={`font-inter-bold ${
														isSelected ? 'text-red-500' : 'text-black'
													}`}
												>
													{service.tower}º {service.floor} - Apartamento {service.apartment}
												</Text>
												<Text className={`${isSelected ? 'text-red-500' : 'text-neutral-500'}`}>
													{service.labor_quantity} - {serviceName}
												</Text>
											</View>

											{isSelected && (
												<View className="h-6 w-6 items-center justify-center rounded-full bg-red-500">
													<Feather name="check" size={14} color="#fff" />
												</View>
											)}
										</Pressable>
									)
								})}
						</View>
					)}
				</Card.Body>
			</Card>
		</View>
	)
}
