import Card from '@/components/ui/card'
import { Feather } from '@expo/vector-icons'
// import { Button } from '@/components/ui/button'
import { TableList } from '@/components/ui/table-list'
import { Dropdown } from '@/components/ui/dropdown'
import { Text, View, Pressable } from 'react-native'
import { Controller } from 'react-hook-form'
import { RadioCheckOption } from '@/components/ui/input-radio'

const items = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }, { label: 'Item 4' }]
const apartments = [{ label: '1' }, { label: '2' }, { label: '3' }, { label: '4' }]
const typeOptions = [
	{ label: 'Extern', value: 'extern' },
	{ label: 'Intern', value: 'intern' },
]

export function RegisterServiceForm({ control }: { control: any }) {
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
						render={({ field: { onChange, value } }) => (
							<Dropdown
								IconLeft={'calendar'}
								IconRight={'chevron-down'}
								className="self-center"
								options={items}
								variant="outline"
								placeholder="Date of service"
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>
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
								options={items}
								variant="outline"
								placeholder="Select the block"
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>
					<Text className="mt-4 text-lg">Floor</Text>
					<Controller
						control={control}
						name="floor"
						render={({ field: { onChange, value } }) => (
							<Dropdown
								IconLeft={'calendar'}
								IconRight={'chevron-down'}
								className="self-center"
								options={items}
								variant="outline"
								placeholder="Select a floor"
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>
				</Card.Body>
			</Card>
			<Card className="ml-6 mr-6 mt-6">
				<Card.Header className="mb-1 flex-row justify-between">
					<Text className="font-inter-bold text-xl text-black">Workers</Text>
					<Pressable className="h-9 items-center justify-center rounded-lg border-2 border-gray-200 ">
						<Text className="w-[135px] text-center text-xl text-gray-700 ">Add</Text>
					</Pressable>
					{/* <Button title="Adicionar" variant="outline" className="h-9 w-[135px]" /> */}
				</Card.Header>
				<Card.Body className="gap-2">
					<View className="flex-row  gap-2">
						<Controller
							control={control}
							name="percent"
							render={({ field: { onChange, value } }) => (
								<Dropdown
									IconRight={'chevron-down'}
									className="basis-2/5"
									options={items}
									variant="outline"
									placeholder="50%"
									value={value}
									onChangeText={onChange}
								/>
							)}
						/>

						<Controller
							control={control}
							name="worker"
							render={({ field: { onChange, value } }) => (
								<Dropdown
									IconLeft={'list'}
									IconRight={'chevron-down'}
									className="basis-3/5"
									options={items}
									variant="outline"
									placeholder="worker"
									value={value}
									onChangeText={onChange}
								/>
							)}
						/>
					</View>
				</Card.Body>
			</Card>

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
								className="self-center"
								options={items}
								variant="outline"
								placeholder="Select the type of service"
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>
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
						name="servicesType"
						render={({ field: { value, onChange } }) => (
							<View className="mb-4 mt-4 flex-row">
								{typeOptions.map((opt) => (
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

					<Controller
						control={control}
						name="services"
						render={({ field: { onChange, value } }) => (
							<Dropdown
								IconLeft={'list'}
								IconRight={'chevron-down'}
								className="self-center"
								options={items}
								variant="outline"
								placeholder="Select the service"
								value={value}
								onChangeText={onChange}
							/>
						)}
					/>

					<View className="mt-4 flex-row items-center justify-between rounded-lg border border-red-500 bg-red-100 p-4">
						<View>
							<Text className="font-inter-bold text-4xl text-red-500">29</Text>
						</View>
						<View>
							<Text className="font-inter-bold text-red-500">4º floor 4 - Apartment 3</Text>
							<Text className="font-inter-bold text-red-500">6.368m - Elevation</Text>
						</View>
						<View className="h-6 w-6 items-center justify-center rounded-full bg-red-500">
							<Feather name="check" size={14} color="#fff" />
						</View>
					</View>
				</Card.Body>
			</Card>
		</View>
	)
}
