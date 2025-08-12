import { KeyboardAvoidingView, Image, Text, View, Pressable, Modal, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Card from '@/components/ui/card'
import { useState } from 'react'
import { RegisterServiceForm } from '@/screens/drawer/register-service/register-service-form'
import { RadioCheckOption } from '@/components/ui/input-radio'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { WorkersForm } from '@/screens/drawer/register-service/workers-form'
import { TypeServiceForm } from './type-service-form'
import { residencialMock } from '@/mock'
import { Feather } from '@expo/vector-icons'

const registerServiceSchema = z.object({
	dateOfService: z.string(),
	tower: z.string(),
	floor: z.string(),
	percent: z.string(),
	worker: z.string(),
	typeOfService: z.string(),
	apartments: z.array(z.string()),
	servicesType: z.string(),
	services: z.string(),
})

export type RegisterServiceType = z.infer<typeof registerServiceSchema>

export default function RegisterServiceScreen() {
	const [confirmed, setConfirmed] = useState(false)
	const [modalVisible, setModalVisible] = useState(false)

	const residentials = residencialMock.data || []
	const [resIndex, setResIndex] = useState(0)
	const currentResidential = residentials[resIndex]

	const {
		control,
		handleSubmit,
		setValue,
		resetField,
		formState: { errors },
	} = useForm<RegisterServiceType>({
		resolver: zodResolver(registerServiceSchema),
	})

	function onSubmit(data: any) {
		console.log('Dados do Serviço: ', JSON.stringify(data))
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<SafeAreaView className="bg-[#F9FAFB]">
				<KeyboardAvoidingView behavior={'height'}></KeyboardAvoidingView>
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
				<Modal visible={modalVisible} transparent animationType="slide">
					<View className="flex-1 justify-center bg-black/40">
						<View className="mx-6 max-h-[80%] rounded-lg bg-white p-4">
							<View className="mb-3 flex-row items-center justify-between">
								<Text className="text-lg font-bold text-gray-800">Select a residential</Text>
								<Pressable onPress={() => setModalVisible(false)}>
									<Feather name="x" size={24} color="#111827" />
								</Pressable>
							</View>

							<FlatList
								data={residentials}
								keyExtractor={(item) => String(item.id)}
								renderItem={({ item, index }) => (
									<Pressable
										className="border-b border-gray-200 p-3"
										onPress={() => {
											resetField('tower')
											resetField('floor')
											setResIndex(index)
											setModalVisible(false)
										}}
									>
										<Text className="text-gray-800">{item.name}</Text>
									</Pressable>
								)}
							/>
						</View>
					</View>
				</Modal>

				<RegisterServiceForm
					control={control}
					currentResidential={currentResidential}
					setValue={setValue}
				></RegisterServiceForm>
				<WorkersForm control={control}></WorkersForm>
				<TypeServiceForm control={control}></TypeServiceForm>

				<Card className="m-6">
					<Card.Body>
						<RadioCheckOption
							label="The service has been completed"
							selected={confirmed}
							onPress={() => setConfirmed(!confirmed)}
							variant="checkbox"
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
			</SafeAreaView>
		</ScrollView>
	)
}
