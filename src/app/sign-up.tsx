import { useRouter } from 'expo-router'
import { Text, View } from 'react-native'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Dropdown } from '../components/ui/dropdown'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const items = [{ label: 'Item 1' }, { label: 'Item 2' }, { label: 'Item 3' }, { label: 'Item 4' }]

const signUpSchema = z.object({
	name: z.string().min(1, "Full name is required"),
	email: z.email('Invalid e-mail'),
	cpf: z.string().min(1, "CPF is required"),
	phone: z.string().nonempty("Phone number is required"),
	jobTitle: z.string,
	password: z.string().min(6, "Password must be at least 6 characters"),
	confirmPassword: z.string()
})
.refine((data) => data.password === data.confirmPassword, {
	message: "Passwords don't match",
	path: ['confirmPassword']
})

type SignUpForm = z.infer<typeof signUpSchema>

export default function SignUp() {
	const router = useRouter()
	const { control, handleSubmit, formState: { errors }, setValue} = useForm<SignUpForm>({
		resolver: zodResolver(signUpSchema)
	})

	function SignUp(data: any) {
		console.log(data)
		router.navigate('/sign-in')
	}

	return (
		<ScrollView
			contentContainerStyle={{ flexGrow: 1 }}
			showsVerticalScrollIndicator={false}
			className="bg-white"
		>
			<SafeAreaProvider>
				<SafeAreaView className="my-5 bg-white p-10">
					<View className="h-full items-center justify-between gap-5 ">
						<View className="gap-1">
							<Text>Full name</Text>
							<Controller
							control={control}
							name="name"
							render={({ field: { onChange, value } }) => (
							<Input placeholder="Type your full name" IconLeft={'user'} className="self-center" onChangeText={onChange} value={value} />

							)}
							/>
							{errors.name && <Text>{errors.name.message}</Text>}
						</View>
						<View className="gap-1">
							<Text>E-mail</Text>
							<Controller
							control={control}
							name="email"
							render={({ field: { onChange, value } }) => (
							<Input placeholder="your-email@email.com" IconLeft={'mail'} className="self-center" onChangeText={onChange} value={value}/>
							)}
							/>
							{errors.email && <Text>{errors.email.message}</Text>}
						</View>
						<View className="gap-1">
							<Text>CPF</Text>
							<Controller
							control={control}
							name="cpf"
							render={({ field: { onChange, value } }) => (
							<Input  placeholder="000.000.000-00" IconLeft={'file'} className="self-center" onChangeText={onChange} value={value}/>
							)}
							/>
							{errors.cpf && <Text>{errors.cpf.message}</Text>}
						</View>
						<View className="gap-1">
							<Text>Phone number</Text>
							<Controller
							control={control}
							name="phone"
							render={({ field: { onChange, value } }) => (
							<Input placeholder="(00) 00000 0000" IconLeft={'phone'} className="self-center" onChangeText={onChange} value={value}/>)}/>
							{errors.phone && <Text>{errors.phone.message}</Text>}
						</View>
						<View className="gap-1">
							<Text>Job title</Text>
								<Controller
								control={control}
								name="jobTitle"
								render={({ field }) => (
							<Dropdown
								IconLeft={'briefcase'}
								IconRight={'chevron-down'}
								className="self-center"
								options={items}
								variant="outline"
								placeholder="Select an option"
								onChangeText={selected => setValue('jobTitle', selected)}
							/>
								)}
							/>
							{errors.jobTitle && <Text>{errors.jobTitle.message}</Text>}
						</View>
						<View className="gap-1">
							<Text>Password</Text>
							<Controller
								control={control}
								name="password"
								render={({ field: { onChange, value } }) => (
								<Input
									placeholder="Type your password"
									IconLeft={'lock'}
									IconRight={'eye'}
									secureTextEntry
									className="self-center"
									onChangeText={onChange}
									value={value}
								/>
							)}
							/>
							{errors.password && <Text>{errors.password.message}</Text>}
						</View>
						<View className="gap-1">
							<Text>Confirm password</Text>
							<Controller
								control={control}
								name="confirmPassword"
								render={({ field: { onChange, value} }) => (
								<Input
									placeholder="Confirm your password"
									IconLeft={'lock'}
									IconRight={'eye'}
									secureTextEntry
									className="self-center" onChangeText={onChange} value={value}
								/>
							)}
							/>
							{errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}
						</View>

						<Button
							title="Create account"
							onPress={handleSubmit(SignUp)}
							className="my-5"
						/>
						<View className="py-5">
							<Text>
								Already have an account?
								<Text
									onPress={() => router.navigate('/sign-in')}
									className="font-inter-bold text-blue-500"
								> Sign in
								</Text>
							</Text>
						</View>
						
					</View>
				</SafeAreaView>
			</SafeAreaProvider>
		</ScrollView>
	)
}
