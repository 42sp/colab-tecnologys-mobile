import Card from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
import { Dropdown } from '@/components/ui/dropdown'
import { Text, View } from 'react-native'
import {
	Controller,
	type UseFormSetValue,
	type Control,
	useWatch,
	FieldErrors,
} from 'react-hook-form'
import type { RegisterServiceType } from '@/screens/drawer/register-service/register-service'

const items = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }, { label: 'Item 4' }]

type Props = {
	control: Control<RegisterServiceType>
	setValue: UseFormSetValue<RegisterServiceType>
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

export function RegisterServiceForm({ control, currentResidential, setValue, errors }: Props) {
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
								options={towerOptions}
								variant="outline"
								placeholder="Select the block"
								value={value}
								onChangeText={(val: string) => {
									setValue('floor', '', { shouldValidate: true, shouldDirty: true })
									onChange(val)
								}}
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
							/>
						)}
					/>
					{/* {errors.floor && <Text className="text-red-500">{errors.floor.message}</Text>} */}
				</Card.Body>
			</Card>
		</View>
	)
}
