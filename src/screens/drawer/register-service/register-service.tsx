import { KeyboardAvoidingView, Image, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import Card from '@/components/ui/card'
import { useState } from 'react'
import { RegisterServiceForm } from '@/screens/drawer/register-service/register-service-form'
import { RadioCheckOption } from '@/components/ui/input-radio'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

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

type RegisterServiceType = z.infer<typeof registerServiceSchema>

export default function RegisterServiceScreen() {
	const [confirmed, setConfirmed] = useState(false)
	

	const { control, handleSubmit, formState: { errors } } = useForm<RegisterServiceType>({
		resolver: zodResolver(registerServiceSchema),
	})

	function onSubmit(data: any) {
		console.log('Dados do Serviço: ', JSON.stringify(data))
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false} >
			<SafeAreaView className="bg-[#F9FAFB]">
				<KeyboardAvoidingView behavior={'height'}></KeyboardAvoidingView>
				<Card className="ml-6 mr-6 flex-1">
					<Card.Header>
						<Image source={require('@/assets/service.png')} className="h-48 w-full rounded-lg" />
					</Card.Header>
					<Card.Body>
						<View className="flex-row items-center gap-4 rounded-lg bg-gray-50 p-3">
							<Image source={require('@/assets/residencial-icon.png')} className="h-12 w-12" />
							<Text className="font-inter-medium text-lg text-gray-800">Residencial Jardins</Text>
						</View>
					</Card.Body>
				</Card>
				<RegisterServiceForm control={control}></RegisterServiceForm>
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
