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
import { useState, useMemo, useEffect, use } from 'react'
import { Feather } from '@expo/vector-icons'
import type { RegisterServiceType } from './register-service'
import { Services } from '@/api/get-services'
import { ServiceTypes } from '@/api/get-service-types'

type Props = {
	control: Control<RegisterServiceType>
	errors: FieldErrors<RegisterServiceType>
	resetField: UseFormResetField<RegisterServiceType>
	services: Services[]
	serviceTypes: ServiceTypes[]
	onServiceSelected?: (serviceId: string | null) => void
}

const radioOptions = [{ label: 'Externa' }, { label: 'Interna' }]

export const serviceMap: Record<string, string> = {
	C: 'Contrapiso',
	M: 'Marcação',
	E: 'Elevação',
	F: 'Fixação',
	EX: 'Serviço Extra',
}

const getKeyByValue = (value: string) => {
	return Object.keys(serviceMap).find((key) => serviceMap[key] === value)
}

export function TypeServiceForm({
	control,
	errors,
	services,
	serviceTypes,
	onServiceSelected,
	resetField,
}: Props) {
	const selectedTower = useWatch({ name: 'tower', control })
	const selectedFloor = useWatch({ name: 'floor', control })
	const selectedServiceType = useWatch({ name: 'typeOfService', control })
	const selectedService = useWatch({ name: 'services', control })
	const selectedApartments = useWatch({ name: 'apartments', control })
	const selectedMeasurementUnit = useWatch({ name: 'measurementUnit', control })
	const [selectedStage, setSelectedStage] = useState<string | null>(null)

	const baseFilteredServices = useMemo(() => {
		// console.log(services)
		// services.map(s => console.log(s.id))
		if (!selectedTower || !selectedFloor) return []
		return services.filter(
			(s) =>
				s.tower?.toString().trim() === selectedTower?.toString().trim() &&
				s.floor?.toString().trim() === selectedFloor?.toString().trim(),
		)
	}, [services, selectedTower, selectedFloor])

	const serviceTypeOptions = useMemo(() => {
		if (!serviceTypes.length) return []

		const ids = new Set(baseFilteredServices.map((s) => String(s.service_type_id).trim()))
		return Array.from(ids).map((id) => {
			const type = serviceTypes.find((t) => String(t.id).trim() === id)
			return {
				label: type?.service_name || id,
				value: id,
			}
		})
	}, [baseFilteredServices, serviceTypes])

	const servicesFilteredByServiceType = useMemo(() => {
		if (!selectedServiceType) return []
		return baseFilteredServices.filter(
			(s) => String(s.service_type_id).trim() === String(selectedServiceType).trim(),
		)
	}, [baseFilteredServices, selectedServiceType])

	const serviceOptions = useMemo(() => {
		const item = services
			.filter(
				(f) =>
					f.tower?.toString().trim() === selectedTower?.toString().trim() &&
					f.floor?.toString().trim() === selectedFloor?.toString().trim() &&
					f.service_type_id?.toString().trim() === selectedServiceType,
			)
			.reduce((acc: any[], curr: any) => {
				if (!acc.some((item: any) => item.acronym === curr.acronym)) {
					acc.push(curr)
				}
				return acc
			}, [])
		return item
	}, [selectedServiceType])

	const apartmentOptions = useMemo(() => {
		const list = services
			.filter((f) => f.tower?.toString().trim() === selectedTower?.toString().trim())
			.filter((f) => f.floor?.toString().trim() === selectedFloor?.toString().trim())
			.filter((f) => f.service_type_id?.toString().trim() === selectedServiceType)
			.filter((f) => f.acronym?.toString().trim() === getKeyByValue(selectedService))
			.reduce((acc: any[], curr: any) => {
				if (!acc.some((item: any) => item.apartment === curr.apartment)) {
					acc.push(curr)
				}
				return acc
			}, [])
			.filter((f) => !selectedApartments.includes(f.apartment?.toString().trim() ?? ''))
			.sort((a, b) => Number(a.apartment) - Number(b.apartment))

		const apartments = [...new Set(list.map((s) => s.apartment?.toString().trim()).filter(Boolean))]

		return apartments.map((apartment) => ({
			label: apartment,
			value: apartment,
		}))
	}, [selectedService, selectedApartments, serviceOptions])

	const servicesFilteredByApartments = useMemo(() => {
		if (!selectedApartments?.length) return []
		return servicesFilteredByServiceType.filter((s) =>
			selectedApartments.includes(s.apartment?.toString().trim() ?? ''),
		)
	}, [servicesFilteredByServiceType, selectedApartments])

	const measurementUnitOptions = useMemo(() => {
		return [
			...new Set(servicesFilteredByApartments.map((s) => s.measurement_unit?.toString().trim())),
		]
			.filter(Boolean)
			.map((unit) => ({
				label: unit,
				value: unit,
			}))
	}, [servicesFilteredByApartments])

	const filteredServices = useMemo(() => {
		const item = services
			.filter((f) => f.tower?.toString().trim() === selectedTower?.toString().trim())
			.filter((f) => f.floor?.toString().trim() === selectedFloor?.toString().trim())
			.filter((f) => f.service_type_id?.toString().trim() === selectedServiceType)
			.filter((f) => f.acronym?.toString().trim() === getKeyByValue(selectedService))
			.filter((f) => selectedApartments.includes(f.apartment?.toString().trim() ?? ''))
			.filter((f) => f.measurement_unit?.toString().trim() === selectedMeasurementUnit)

		if (!selectedService) return []

		return item
	}, [selectedMeasurementUnit])

	useEffect(() => {
		resetField('floor')
	}, [selectedTower])

	useEffect(() => {
		resetField('typeOfService')
	}, [selectedFloor])

	useEffect(() => {
		resetField('services')
	}, [selectedServiceType])

	useEffect(() => {
		resetField('apartments')
	}, [selectedService])

	useEffect(() => {
		resetField('measurementUnit')
	}, [selectedApartments])

	return (
		<View>
			<Card>
				<Card.Header>
					<Text className="font-inter-bold text-xl text-black">Tipo de serviço</Text>
				</Card.Header>
				<Card.Body className="gap-5">
					<View className="gap-2">
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
										resetField('services')
									}}
									hasError={!!errors.typeOfService}
								/>
							)}
						/>
						{errors.typeOfService && (
							<Text className="text-md  text-red-500">{errors.typeOfService.message}</Text>
						)}
					</View>
					<View className="gap-2">
						<Controller
							control={control}
							name="services"
							render={({ field: { onChange, value } }) => (
								<Dropdown
									IconLeft={'list'}
									IconRight={'chevron-down'}
									options={serviceOptions.map((item) => ({
										label: serviceMap[item.acronym] || item.acronym,
										value: item.acronym,
									}))}
									variant="outline"
									placeholder="Selecione os serviços"
									value={selectedService}
									onChangeText={(label) => {
										const matched = serviceOptions.find((opt) => opt.label === label)
										const val = matched?.value ?? label
										onChange(val)
									}}
									hasError={!!errors.services}
								/>
							)}
						/>
						{errors.services && (
							<Text className="text-md mb-2 text-red-500">{errors.services.message as string}</Text>
						)}
					</View>
					<Text className=" text-lg">Apartamentos</Text>
					<View className="gap-2">
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
												<TableList
													options={selectedApartments}
													onChange={updateSelectedApartments}
												/>
											</View>
										)}
									</>
								)
							}}
						/>
						{errors.apartments && (
							<Text className="text-md text-red-500">{errors.apartments.message as string}</Text>
						)}
					</View>
					<View className="gap-2">
						<Controller
							control={control}
							name="measurementUnit"
							render={({ field: { onChange, value } }) => (
								<Dropdown
									IconLeft={'list'}
									IconRight={'chevron-down'}
									options={measurementUnitOptions}
									variant="outline"
									placeholder="Selecione a unidade de medição"
									value={value}
									onChangeText={onChange}
									hasError={!!errors.measurementUnit}
								/>
							)}
						/>
						{errors.measurementUnit && (
							<Text className="text-md text-red-500">{errors.measurementUnit.message}</Text>
						)}
					</View>
					{selectedService && (
						<View>
							{filteredServices
								.sort((a, b) => Number(a.stage) - Number(b.stage))
								.map((service) => {
									const isSelected = selectedStage === service.stage
									const serviceName = serviceMap[service.acronym] || service.acronym

									return (
										<Pressable
											key={service.id}
											onPress={() => {
												setSelectedStage(service.stage)
												onServiceSelected?.(service.id)
											}}
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
												<Text className={`${isSelected ? 'text-red-500' : 'text-black'}`}>
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
