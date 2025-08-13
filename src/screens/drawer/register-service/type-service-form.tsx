import Card from '@/components/ui/card'
import { Dropdown } from '@/components/ui/dropdown'
import { Controller, useWatch, type Control, type FieldErrors } from 'react-hook-form'
import { Text, View, Pressable } from 'react-native'
import { RadioCheckOption } from '@/components/ui/input-radio'
import { TableList } from '@/components/ui/table-list'
import { Feather } from '@expo/vector-icons'
import type { RegisterServiceType } from './register-service'
import { serviceTypeMock, serviceMock } from '@/mock'

const apartments = [{ label: '1' }, { label: '2' }, { label: '3' }, { label: '4' }]
const radioOptions = [
	{ label: 'Extern', value: 'extern' },
	{ label: 'Intern', value: 'intern' },
]

type Props = {
	control: Control<RegisterServiceType>
	errors: FieldErrors<RegisterServiceType>
}

export function TypeServiceForm({ control, errors }: Props) {
	const serviceTypeOptions = serviceMock.map((s) => ({ label: s.name, value: s.name }))
	const services = serviceTypeMock.map((s) => ({ label: s.name, value: s.name }))

	const selectedServiceName = useWatch({ control, name: 'services' })
	const selectedService = serviceTypeMock.find((s) => s.name === selectedServiceName)

	return (
		<View>
			<Card className="ml-6 mr-6 mt-6">
				<Card.Header>
					<Text className="font-inter-bold text-xl text-black">Type of service</Text>
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
								placeholder="Select the type of service"
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>
				{errors.typeOfService && (
					<Text className="text-xs text-red-500">{errors.typeOfService.message}</Text>
				)}
					<Text className="mt-4 text-lg">Apartment</Text>
					<Controller
						control={control}
						name="apartments"
						defaultValue={[]}
						render={({
							field: { value: selectedApartments = [], onChange: updateSelectedApartments },
						}) => {
							type ApartmentOption = string | { label: string; value: string }

							const getOptionValue = (option: ApartmentOption) =>
								typeof option === 'string' ? option : option?.value

							const addApartment = (option: ApartmentOption) => {
								const apartment = getOptionValue(option)
								if (!apartment) return
								if (!selectedApartments.includes(apartment)) {
									updateSelectedApartments([...selectedApartments, apartment])
								}
							}

							return (
								<>
									<Dropdown
										IconLeft="list"
										IconRight="chevron-down"
										className="self-center"
										options={apartments}
										variant="outline"
										placeholder="Select the apartments"
										value=""
										onChangeText={addApartment}
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

					<Controller
						control={control}
						name="classification"
						render={({ field: { value, onChange } }) => (
							<View className="mb-4 mt-4 flex-row">
								{radioOptions.map((opt) => (
									<RadioCheckOption
										key={opt.value}
										label={opt.label}
										selected={value === opt.value}
										onPress={() => onChange(opt.value)}
										variant="radio"
									/>
								))}
							</View>
						)}
					/>

				{errors.apartments && (
					<Text className="text-xs text-red-500">{errors.apartments.message as string}</Text>
				)}
					<Controller
						control={control}
						name="services"
						render={({ field: { onChange, value } }) => (
							<Dropdown
								IconLeft={'list'}
								IconRight={'chevron-down'}
							options={services}
								variant="outline"
								placeholder="Select the service"
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>
				{errors.services && <Text className="text-xs text-red-500">{errors.services.message}</Text>}

				{selectedService && (
					<View className="mt-4 flex-row items-center justify-between rounded-lg border border-red-500 bg-red-100 p-4">
						<View>
							<Text className="font-inter-bold text-4xl text-red-500">{selectedService.id}</Text>
						</View>
						<View className="flex-1 px-4">
							<Text className="font-inter-bold text-red-500">{selectedService.name} - Apartment 1</Text>
							<Text className="text-red-500">6.368m - Elevation</Text>
						</View>
						<View className="h-6 w-6 items-center justify-center rounded-full bg-red-500">
							<Feather name="check" size={14} color="#fff" />
						</View>
					</View>
				)}
				</Card.Body>
			</Card>
		</View>
	)
}
