import {
	KeyboardAvoidingView,
	Image,
	Text,
	View,
	Pressable,
	ScrollView,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from '@/components/ui/card'
import { useState } from 'react'
import { RegisterServiceForm } from '@/screens/drawer/register-service/register-service-form'
import { RadioCheckOption } from '@/components/ui/input-radio'
import { useForm, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { WorkersForm } from '@/screens/drawer/register-service/workers-form'
import { TypeServiceForm } from './type-service-form'
import { residencialMock } from '@/mock'
import { ChooseResidentialModal } from '@/screens/drawer/register-service/choose-residential-modal'

const registerServiceSchema = z
	.object({
		dateOfService: z.string().nonempty('Date is required.'),
		tower: z.string().nonempty('Tower is required.'),
		floor: z.string().nonempty('Floor is required.'),
		workers: z.array(
			z.object({
				percent: z.number('Percent is required.').min(0).max(100),
				worker: z.string().nonempty('Worker is required.'),
			}),
		),
		typeOfService: z.string().nonempty('Type of service is required.'),
		apartments: z.array(z.string()).min(1, 'At least one apartment is required.'),
		classification: z.string().nonempty('Choose one option.'),
		services: z.string().nonempty('Service is required.'),
		confirmed: z.boolean().optional(),
	})
	.superRefine((data, ctx) => {
		const sum = (data.workers || []).reduce((acc, w) => acc + (w.percent || 0), 0)
		if (sum > 100) {
			ctx.addIssue({
				code: 'custom',
				message: `(${sum}%) - Cannot exceed 100%`,
				path: ['workers'],
			})
		}
	})

export type RegisterServiceType = z.infer<typeof registerServiceSchema>

export default function RegisterServiceScreen() {
	const [modalVisible, setModalVisible] = useState(false)

	const residentials = residencialMock.data
	const [resIndex, setResIndex] = useState(0)
	const currentResidential = residentials[resIndex]

	const {
		control,
		handleSubmit,
		reset,
		resetField,
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
			classification: '',
			services: '',
			confirmed: false,
		},
	})

	function onSubmit(data: RegisterServiceType) {
		console.log('Dados do Serviço: ', JSON.stringify(data))
		reset()
		setResIndex(0)
	}

	function handleSelectResidential(index: number) {
		resetField('tower')
		resetField('floor')
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
									{currentResidential ? currentResidential.name : 'Select a residential'}
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
						currentResidential={currentResidential}
						resetField={resetField}
						errors={errors}
					></RegisterServiceForm>

					<WorkersForm control={control} errors={errors} />

					<TypeServiceForm control={control} errors={errors} />

					<Card className="m-6">
						<Card.Body>
							<Controller
								control={control}
								name="confirmed"
								render={({ field: { value, onChange } }) => (
									<RadioCheckOption
										label="The service has been completed"
										selected={!!value}
										onPress={() => onChange(!value)}
										variant="checkbox"
									/>
								)}
							/>
						</Card.Body>
					</Card>
					<View className="m-6 flex-row gap-2">
						<Button title="Cancel" variant="outline" className="flex-1" onPress={() => {}} />
						<Button
							title="Send"
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
