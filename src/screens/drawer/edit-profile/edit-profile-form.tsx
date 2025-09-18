import { Text, View } from 'react-native'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Feather } from '@expo/vector-icons'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Card from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from '@/_layouts/drawer/drawer'
import { EditProfile } from '@/api/edit-profile'
import { updateProfile } from '@/libs/redux/user-profile/user-profile-slice'
import { useState } from 'react'
import { LogModal } from '@/components/ui/log-modal'
import { LoadingModal } from '@/components/ui/loading-modal'

const editProfileSchema = z.object({
	name: z.string().nonempty('Nome completo é obrigatório'),
	email: z.string(),
	phone: z.string().nonempty('Telefone é obrigatório'),
	dateOfBirth: z.string().nonempty('Data de nascimento é obrigatório'),
	address: z.string().nonempty('Endereço é obrigatório'),
})

type EditProfileType = z.infer<typeof editProfileSchema>

export function EditProfileForm() {
	const profile = useSelector((state: RootState) => state.userProfile)

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<EditProfileType>({
		resolver: zodResolver(editProfileSchema),
		defaultValues: {
			name: profile.name || '',
			email: profile.email || '',
			phone: profile.phone || '',
			dateOfBirth: profile.dateOfBirth
				? new Date(profile.dateOfBirth).toLocaleDateString('pt-BR')
				: '',
			address: profile.address || '',
		},
	})
	type ProfileScreenNavigationProp = DrawerNavigationProp<DrawerParamList>
	const navigation = useNavigation<ProfileScreenNavigationProp>()
	const dispatch = useDispatch()
	const [modal, setModal] = useState<{
		visible: boolean
		status: 'error' | 'success'
		description: string
	}>({ visible: false, status: 'error', description: '' })

	async function onSubmit(data: EditProfileType) {
		try {
			await new Promise((resolve) => setTimeout(resolve, 5000))
			const payload: any = {
				name: data.name,
				phone: data.phone,
				address: data.address,
				date_of_birth: data.dateOfBirth
					? new Date(data.dateOfBirth.split('/').reverse().join('-')).toISOString().split('T')[0]
					: undefined,
			}
			if (data.email && data.email.trim() !== '') {
				payload.email = data.email
			}

			const updated = await EditProfile(payload)
			dispatch(
				updateProfile({
					name: updated.name,
					dateOfBirth: updated.date_of_birth,
					registrationCode: updated.registration_code,
					phone: updated.phone,
					address: updated.address,
					city: updated.city,
					state: updated.state,
					postcode: updated.postcode,
					photo: updated.photo,
					updatedAt: updated.updated_at,
				}),
			)
			setModal({ visible: true, status: 'success', description: 'Perfil atualizado!' })
		} catch (error) {
			console.log(error)
			setModal({
				visible: true,
				status: 'error',
				description: 'Não foi possível editar o perfil. Tente novamente mais tarde.',
			})
		}
	}

	function onCancel() {
		reset({
			name: profile.name || '',
			email: profile.email || '',
			phone: profile.phone || '',
			dateOfBirth: profile.dateOfBirth
				? new Date(profile.dateOfBirth).toLocaleDateString('pt-BR')
				: '',
			address: profile.address || '',
		})
		navigation.navigate('profile')
	}

	return (
		<View>
			<Card className="m-5 gap-5 ">
				<Card.Header>
					<Text className="font-inter-bold text-xl">Informações Pessoais</Text>
				</Card.Header>
				<Card.Body className="gap-3">
					<View className="gap-1">
						<Text className="font-inter text-lg">Nome completo</Text>
						<Controller
							control={control}
							name="name"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder="Seu nome completo"
									IconLeft={'user'}
									className="self-center"
									onChangeText={onChange}
									value={value}
									hasError={!!errors.name}
								/>
							)}
						/>
						{errors.name && <Text className="text-red-500">{errors.name.message}</Text>}
					</View>

					<View className="gap-1">
						<Text className="font-inter text-lg">E-mail</Text>
						<Controller
							control={control}
							name="email"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder="seu.email@email.com"
									keyboardType="email-address"
									autoCapitalize="none"
									IconLeft={'mail'}
									className="self-center"
									onChangeText={onChange}
									value={value}
									hasError={!!errors.email}
								/>
							)}
						/>
						{errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
					</View>

					<View className="gap-1">
						<Text className="font-inter text-lg">Telefone</Text>
						<Controller
							control={control}
							name="phone"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder="(00) 00000 0000"
									keyboardType="phone-pad"
									IconLeft={'phone'}
									className="self-center"
									onChangeText={onChange}
									value={value}
									hasError={!!errors.phone}
								/>
							)}
						/>
						{errors.phone && <Text className="text-red-500">{errors.phone.message}</Text>}
					</View>

					<View className="gap-1">
						<Text className="font-inter text-lg">Data de nascimento</Text>
						<Controller
							control={control}
							name="dateOfBirth"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder="15/05/1988"
									IconLeft={'user'}
									className="self-center"
									onChangeText={onChange}
									value={value}
									hasError={!!errors.dateOfBirth}
								/>
							)}
						/>
						{errors.dateOfBirth && (
							<Text className="text-red-500">{errors.dateOfBirth.message}</Text>
						)}
					</View>
					<View className="gap-1">
						<Text className="font-inter text-lg">Endereço</Text>
						<Controller
							control={control}
							name="address"
							render={({ field: { onChange, value } }) => (
								<Input
									placeholder="Seu endereço"
									IconLeft={'user'}
									className="self-center"
									onChangeText={onChange}
									value={value}
									hasError={!!errors.address}
								/>
							)}
						/>
						{errors.address && <Text className="text-red-500">{errors.address.message}</Text>}
					</View>

					<View className="mt-6 flex-row gap-2">
						<Button title="Cancelar" variant="outline" className="flex-1" onPress={onCancel} />
						<Button className="flex-1" onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
							<Text className="mr-2 font-inter-medium text-xl text-neutral-100">Salvar</Text>
							<Feather name="check-circle" size={20} color="#fff" />
						</Button>
					</View>
				</Card.Body>
			</Card>
			<LoadingModal visible={isSubmitting} />
			<LogModal
				visible={modal.visible}
				status={modal.status}
				description={modal.description}
				onClose={() => setModal({ visible: false, status: 'error', description: '' })}
			/>
		</View>
	)
}
