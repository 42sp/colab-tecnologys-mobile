import { KeyboardAvoidingView, Image, Text, View, Pressable, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from '@/components/ui/card'
import { useState, useEffect } from 'react'
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
import { getAllProfiles, AllProfileResponse } from '@/api/get-profile'
import { createTask } from '@/api/post-tasks'

const registerServiceSchema = z
	.object({
		dateOfService: z.string().nonempty('Selecione uma data.'),
		tower: z.string().nonempty('Selecione a torre.'),
		floor: z.string().nonempty('Selecione o andar.'),
		workers: z.array(
			z.object({
				percent: z.number('Insira o percentual do serviço.').min(0).max(100),
				worker: z.string().nonempty('Selecione um tarefeiro.'),
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
	const [modalVisible, setModalVisible] = useState(false)
	const [allServices, setAllServices] = useState<Services[]>([])
	const [serviceTypes, setServiceTypes] = useState<ServiceTypes[]>([])
	const [residentials, setResidentials ] = useState<Construction[]>([])
	const [profiles, setProfiles ] = useState<AllProfileResponse[]>([])
	const [resIndex, setResIndex] = useState(0);
	const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

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
			workers: [{ percent: 100, worker: '' }],
			typeOfService: '',
			apartments: [],
			measurementUnit: '',
			classification: '',
			services: '',
			confirmed: false,
		},
	})

	useEffect(() => {
		const fetchData = async () => {
			try {
				const services = await getServices()
				const serviceType = await getServiceTypes()
				const construction = await getConstructions()
				const profile = await getAllProfiles()
				setProfiles(profile)
				setResidentials(construction.data)
				setServiceTypes(serviceType.data)
				setAllServices(services)
			} catch (error) {
				console.error(error)
			}
		}

		fetchData()
	}, [])

	async function onSubmit(data: RegisterServiceType) {
		try {
			console.log('Dados do Serviço: ', JSON.stringify(data))

			if (!selectedServiceId) {
				console.error('No service has been selected')
				return
			}

			const tasks = await Promise.all(
				data.workers.map(async (worker) => {
					const taskData = {
						service_id: selectedServiceId,
						worker_id: worker.worker,
						completion_date: data.dateOfService,
						task_percentage: worker.percent,
						status: 'pending' as const
					}
					return await createTask(taskData)
				})
			)
			reset()
			setResIndex(0)
			setSelectedServiceId(null)
		} catch (error) {
			console.error('Error creating tasks:', error)
		}
	}

	function handleSelectResidential(index: number) {
		// resetField('tower')
		// resetField('floor')
		setResIndex(index)
		setModalVisible(false)
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<SafeAreaView className="bg-[#F9FAFB]">
				<KeyboardAvoidingView behavior={'height'}>
					<Card className="ml-6 mr-6 flex-1">
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
					></RegisterServiceForm>

					<WorkersForm control={control} errors={errors} profiles={profiles}/>

					<TypeServiceForm
						services={allServices}
						serviceTypes={serviceTypes}
						resetField={resetField}
						control={control}
						errors={errors}
						onServiceSelected={setSelectedServiceId}
					/>

					<Card className="m-6">
						<Card.Body>
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
						</Card.Body>
					</Card>
					<View className="m-6 flex-row gap-2">
						<Button title="Cancelar" variant="outline" className="flex-1" onPress={() => {}} />
						<Button
							title="Enviar"
							className="flex-1"
							variant="gradient"
							onPress={handleSubmit(onSubmit)}
						/>
					</View>
				</KeyboardAvoidingView>
			</SafeAreaView>
		</ScrollView>
	)
}
