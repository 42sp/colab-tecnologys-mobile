import Card from '@/components/ui/card'
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { Dropdown } from '@/components/ui/dropdown'
import { Text, View, Pressable } from 'react-native'
import { Controller } from 'react-hook-form'

const items = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }, { label: 'Item 4' }]

export function RegisterServiceForm({ control }: { control: any }) {
	return (
		<View>
			<Card className="ml-6 mr-6">
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
					<Text className="font-inter-bold text-xl text-black">Tarefeiro</Text>
					<Pressable className="h-9 items-center justify-center rounded-lg border-2 border-gray-200 ">
						<Text className="w-[135px] text-center text-xl text-gray-700 ">Adicionar</Text>
					</Pressable>
					{/* <Button title="Adicionar" variant="outline" className="h-9 w-[135px]" /> */}
				</Card.Header>
				<Card.Body className="gap-2">
					<View className="flex-row justify-between gap-2">
						<Controller
							control={control}
							name="percent"
							render={({ field: { onChange, value } }) => (
								<Dropdown
									IconRight={'chevron-down'}
									className="w-28"
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
							name="jobTitle"
							render={({ field: { onChange, value } }) => (
								<Dropdown
									IconLeft={'list'}
									IconRight={'chevron-down'}
									className="w-60"
									options={items}
									variant="outline"
									placeholder="Tarefeiro"
									value={value}
									onChangeText={onChange}
								/>
							)}
						/>
					</View>
				</Card.Body>
			</Card>
		</View>
	)
}
