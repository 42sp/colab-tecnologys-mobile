import { KeyboardAvoidingView, Image, Text, View, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from '@/components/ui/card'
import { useState, useCallback, useEffect } from 'react'
import { RegisterServiceForm } from '@/screens/drawer/register-service/register-service-form'
import { RadioCheckOption } from '@/components/ui/input-radio'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { WorkersForm } from '@/screens/drawer/register-service/workers-form'
import { TypeServiceForm } from './type-service-form'
import { ChooseResidentialModal } from '@/screens/drawer/register-service/choose-residential-modal'
import { getServices, Services } from '@/api/get-services'
import { getServiceTypes, ServiceTypes } from '@/api/get-service-types'
import { getConstructions, Construction } from '@/api/get-constructions'
import { getProfile, Profile } from '@/api/get-profile'
import { createTask } from '@/api/post-tasks'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { LogModal } from '@/components/ui/log-modal'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import LoadingButton from '@/components/ui/loadingButton'
import { useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'

const registerServiceSchema = z
	.object({
		dateOfService: z.string().nonempty('Selecione uma data.'),
		tower: z.string().nonempty('Selecione a torre.'),
		floor: z.string().nonempty('Selecione o andar.'),
		workers: z.array(
			z.object({
				percent: z.number('Insira o percentual do serviço.').min(0).max(100),
				worker_id: z.string().nonempty('Selecione um tarefeiro.'),
			}),
		),
		typeOfService: z.string().nonempty('Tipo de serviço é obrigatório.'),
		apartments: z.array(z.string()).min(1, 'Pelo menos um apartamento deve ser selecionado.'),
		measurementUnit: z.string().nonempty('Unidade de medida é obrigatória.'),
		classification: z.string().nonempty('Escolha a classificação.'),
		services: z.string().nonempty('Serviço é obrigatório.'),
		confirmed: z.boolean().optional(),
	})
	.superRefine((data, ctx) => {
		const sum = (data.workers || []).reduce((total, w) => total + (w.percent || 0), 0)

		if (data.workers.length === 0) {
			return
		}

		if (sum !== 100) {
			ctx.addIssue({
				code: 'custom',
				message: `A soma das porcentagens deve ser 100%, mas é ${sum}%.`,
				path: ['workers'],
			})
		}
	})

export type RegisterServiceType = z.infer<typeof registerServiceSchema>

export default function RegisterServiceScreen() {
	const navigation = useNavigation<DrawerNavigationProp<any>>()

	const { userId } = useSelector((state: RootState) => state.userProfile)
	const [modalVisible, setModalVisible] = useState(false)
	const [allServices, setAllServices] = useState<Services[]>([])
	const [serviceTypes, setServiceTypes] = useState<ServiceTypes[]>([])
	const [residentials, setResidentials] = useState<Construction[]>([])
	const [profiles, setProfiles] = useState<Profile[]>([])
	const [resIndex, setResIndex] = useState(0)
	const [registering, setRegistering] = useState(false)
	const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
	const [modal, setModal] = useState<{
		visible: boolean
		description: string
		status?: 'error' | 'success'
	}>({
		visible: false,
		description: '',
	})

	const currentResidential = residentials[resIndex]

	const {
		control,
		handleSubmit,
		reset,
		resetField,
		setValue,
		formState: { errors },
	} = useForm<RegisterServiceType>({
		resolver: zodResolver(registerServiceSchema),
		defaultValues: {
			dateOfService: '',
			tower: '',
			floor: '',
			workers: [{ percent: 100, worker_id: '' }],
			typeOfService: '',
			apartments: [],
			measurementUnit: '',
			classification: '',
			services: '',
			confirmed: false,
		},
	})

	useFocusEffect(
		useCallback(() => {
			const fetchData = async () => {
				try {
					const services = await getServices()
					const serviceType = await getServiceTypes()
					const construction = await getConstructions()
					const profile = await getProfile({})

					setProfiles(profile.data)
					setResidentials(construction.data)
					setServiceTypes(serviceType.data)
					setAllServices(services)
				} catch (error) {
					console.error('Failed to fetch initial data:', error)
				}
			}

			fetchData()
		}, []),
	)

	useEffect(() => {
		if (profiles.length > 0) {
			reset((prev) => ({
				...prev,
				workers: [
					{
						percent: 100,
						worker_id: userId || '',
					},
				],
			}))
		}
	}, [profiles, reset])

	async function onSubmit(data: RegisterServiceType) {
		setRegistering(true)
		try {
			console.log('Dados do Serviço: ', JSON.stringify(data))

			if (!selectedServiceId) {
				setModal({
					visible: true,
					description: 'Não foi possível registrar o serviço. Tente novamente mais tarde.',
				})
				console.error('No service has been selected')
				return
			}

			await Promise.all(
				data.workers.map(async (worker) => {
					const taskData = {
						service_id: selectedServiceId,
						completion_date: data.dateOfService,
						task_percentage: worker.percent,
						worker_id: worker.worker_id,
						status: 'pending',
					}
					return await createTask(taskData)
				}),
			)
			reset()
			setResIndex(0)
			setSelectedServiceId(null)
			setModal({
				visible: true,
				status: 'success',
				description: 'Serviço registrado com sucesso!',
			})
		} catch (error) {
			setModal({
				visible: true,
				description: 'Não foi possível registrar o serviço. Tente novamente mais tarde.',
			})
			console.error('Error creating tasks:', error)
		}
		setRegistering(false)
	}

	function handleSelectResidential(index: number) {
		reset()
		setResIndex(index)
		setSelectedServiceId(null)
		setModalVisible(false)
	}

	return (
		<SafeAreaView className=" bg-[#F9FAFB]" edges={['bottom']}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="flex-1 gap-5 p-5">
					{/* <KeyboardAvoidingView behavior={'height'}> */}
					<Card className=" flex-1">
						<Card.Header>
							<Image
								source={require('@/assets/residential.png')}
								className="h-48 w-full rounded-lg"
							/>
						</Card.Header>

						<Card.Body>
							<Pressable
								className="flex-row items-center gap-4 rounded-lg bg-gray-50 p-3"
								onPress={() => setModalVisible(true)}
							>
								<Image source={require('@/assets/residencial-icon.png')} className="h-12 w-12" />
								<Text className="font-inter-medium  text-gray-800" numberOfLines={1}>
									{currentResidential ? currentResidential.name : 'Selecione o residencial'}
								</Text>
							</Pressable>
						</Card.Body>
					</Card>

					<ChooseResidentialModal
						visible={modalVisible}
						onClose={() => setModalVisible(false)}
						residentials={residentials}
						onSelect={handleSelectResidential}
					/>

					<RegisterServiceForm
						control={control}
						services={allServices}
						reset={reset}
						resetField={resetField}
						setValue={setValue}
						errors={errors}
					/>

					<WorkersForm control={control} errors={errors} profiles={profiles} />

					<TypeServiceForm
						services={allServices}
						serviceTypes={serviceTypes}
						resetField={resetField}
						control={control}
						errors={errors}
						onServiceSelected={setSelectedServiceId}
					/>

					<Card>
						{/* <Card.Body> */}
						<Controller
							control={control}
							name="confirmed"
							render={({ field: { value, onChange } }) => (
								<RadioCheckOption
									label="Confirmo que o serviço foi finalizado"
									selected={!!value}
									onPress={() => onChange(!value)}
									variant="checkbox"
								/>
							)}
						/>
						{/* </Card.Body> */}
					</Card>
					<View className="flex-row gap-4">
						<Button
							title="Cancelar"
							variant="outline"
							className="flex-1"
							onPress={() => navigation.navigate('home')}
						/>

						<LoadingButton
							title={registering ? 'Registrando…' : 'Enviar'}
							loading={registering}
							onPress={handleSubmit(onSubmit)}
							className="flex-1"
						/>
					</View>
					<LogModal
						visible={modal.visible}
						status={modal.status}
						description={modal.description}
						onClose={() => setModal({ visible: false, status: 'error', description: '' })}
					/>

					{/* </KeyboardAvoidingView> */}
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
