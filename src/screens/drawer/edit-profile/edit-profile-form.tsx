import { Text, View } from 'react-native'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Feather } from '@expo/vector-icons'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Card from '@/components/ui/card'

const editProfileSchema = z.object({
	name: z.string().nonempty('Full name is required'),
	email: z.email('Invalid e-mail'),
	phone: z.string().nonempty('Phone number is required'),
	dateOfBirth: z.string().nonempty('Date of birth is required'),
	address: z.string().nonempty('Address is required'),
})

type EditProfileType = z.infer<typeof editProfileSchema>

export function EditProfileForm() {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<EditProfileType>({
		resolver: zodResolver(editProfileSchema),
	})

	function onSubmit(data: any) {
		console.log('Dados de Registro: ', JSON.stringify(data))
	}

	return (
		<Card className="m-5 gap-5 ">
			<Card.Header>
				<Text className="font-inter-bold text-xl">Personal Information</Text>
			</Card.Header>
			<Card.Body className="gap-3">
				<View className="gap-1">
					<Text>Full name</Text>
					<Controller
						control={control}
						name="name"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Type your full name"
								IconLeft={'user'}
								className="self-center"
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>
					{errors.name && <Text className="text-red-500">{errors.name.message}</Text>}
				</View>

				<View className="gap-1">
					<Text>E-mail</Text>
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="your-email@email.com"
								IconLeft={'mail'}
								className="self-center"
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>
					{errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
				</View>

				<View className="gap-1">
					<Text>Phone number</Text>
					<Controller
						control={control}
						name="phone"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="(00) 00000 0000"
								IconLeft={'phone'}
								className="self-center"
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>
					{errors.phone && <Text className="text-red-500">{errors.phone.message}</Text>}
				</View>

				<View className="gap-1">
					<Text>Date of Birth</Text>
					<Controller
						control={control}
						name="dateOfBirth"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="dd/mm/yyyy"
								IconLeft={'user'}
								className="self-center"
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>
					{errors.dateOfBirth && <Text className="text-red-500">{errors.dateOfBirth.message}</Text>}
				</View>
				<View className="gap-1">
					<Text>Address</Text>
					<Controller
						control={control}
						name="address"
						render={({ field: { onChange, value } }) => (
							<Input
								placeholder="Type your address"
								IconLeft={'user'}
								className="self-center"
								onChangeText={onChange}
								value={value}
							/>
						)}
					/>
					{errors.address && <Text className="text-red-500">{errors.address.message}</Text>}
				</View>

				<View className="mt-6 flex-row gap-2">
					<Button title="Cancelar" variant="outline" className="flex-1" onPress={() => {}} />
					<Button className="flex-1" onPress={handleSubmit(onSubmit)}>
						<Text className="mr-2 font-inter-medium text-xl text-neutral-100">Salvar</Text>
						<Feather name="check-circle" size={20} color="#fff" />
					</Button>
				</View>
			</Card.Body>
		</Card>
	)
}
