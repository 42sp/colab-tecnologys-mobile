import { ProfileAvatar } from './profile-avatar'
import { ProfileInfoItem } from './profile-info-item'
import { Button } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { ProfileIcon } from './profile-icon'

import { useSelector } from 'react-redux'
import type { RootState } from '@/libs/redux/store'

export default function ProfileScreen() {
	const { token } = useSelector((state: RootState) => state.auth)
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<SafeAreaView className="flex-1 gap-5 bg-[#F9FAFB] p-5">
				<ProfileAvatar
					avatar="https://randomuser.me/portraits/men/1.jpg"
					name={'João Silva'}
					email={'joaosilva@gmail.com'}
				/>

				<Card className="flex-1">
					<Card.Header>
						<Text className="font-inter-bold text-xl">Personal Information</Text>
					</Card.Header>

					<Card.Body className="gap-4">
						<ProfileInfoItem label="Full Name" value="João Antônio Silva" icon="user" />
						<ProfileInfoItem
							label="E-mail"
							// value="joaosilva@email.com"
							value={token ?? 'no token'}
							icon="mail"
						/>
						<ProfileInfoItem label="Phone Number" value="(11) 98765-4321" icon="phone" />
						<ProfileInfoItem label="Date of birth" value="15/05/1988" icon="calendar" />
						<ProfileInfoItem
							label="Address"
							value="Rua das Flores, 123 - São Paulo"
							icon="map-pin"
						/>

						<Card.Footer className="mt-4">
							<TouchableOpacity activeOpacity={0.8} className="p-2">
								<Text className="self-center font-inter-bold text-lg text-blue-500">
									Edit Information
								</Text>
							</TouchableOpacity>
						</Card.Footer>
					</Card.Body>
				</Card>

				<View className="rounded-xl bg-white">
					<TouchableOpacity className="w-full flex-row items-center gap-4 rounded-t-xl border border-neutral-100 p-3">
						<ProfileIcon icon="bell" color={'#d97706'} background="#fef3c7" />
						<Text className="font-inter-medium text-xl">Notifications</Text>
					</TouchableOpacity>

					<TouchableOpacity className=" text-pu w-full flex-row items-center gap-4 rounded-b-xl border border-neutral-100 p-3">
						<ProfileIcon icon="lock" color={'#a855f7'} background="#f3e8ff" />
						<Text className="font-inter-medium text-xl">Security</Text>
					</TouchableOpacity>
				</View>

				<Button variant="red" title="Logout" className="">
					<Feather name="log-out" size={20} color={'#ef4444'} className="mr-3" />
				</Button>
			</SafeAreaView>
		</ScrollView>
	)
}
