import Card from '@/components/ui/card'
import { Feather } from '@expo/vector-icons'
// import { Button } from '@/components/ui/button'
import { Dropdown } from '@/components/ui/dropdown'
import { Text, View } from 'react-native'
import { Controller } from 'react-hook-form'

const items = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }, { label: 'Item 4' }]

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

	
		</View>
	)
}
