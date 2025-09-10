import { ProfileAvatar } from './profile-avatar'
import { ProfileInfoItem } from './profile-info-item'
import { Button } from '@/components/ui/button'
import Card from '@/components/ui/card'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { ProfileIcon } from './profile-icon'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { DrawerParamList } from '@/_layouts/drawer/drawer'
import { resetAuth } from '@/libs/redux/auth/auth-slice'
import { LogoutModal } from '@/components/ui/logout-modal'
import { useState } from 'react'

export default function ProfileScreen() {
	const user = useSelector((state: RootState) => state.userProfile)
	type ProfileScreenNavigationProp = DrawerNavigationProp<DrawerParamList>
	const navigation = useNavigation<ProfileScreenNavigationProp>()
	const dispatch = useDispatch()
	const [isModalVisible, setIsModalVisible] = useState(false)

	function confirmLogout() {
		setIsModalVisible(false)
		dispatch(resetAuth())
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<SafeAreaView className="flex-1 gap-5 bg-[#F9FAFB] p-5">
				<ProfileAvatar avatar={require('@/assets/default-avatar.png')} name={user.name || ''} />

				<Card className="flex-1">
					<Card.Header>
						<Text className="font-inter-bold text-xl">Informações pessoais</Text>
					</Card.Header>

					<Card.Body className="gap-4">
						<ProfileInfoItem label="Nome completo" value={user.name || ''} icon="user" />
						<ProfileInfoItem label="Email" value={user.email || ''} icon="mail" />
						<ProfileInfoItem label="Número de telefone" value={user.phone || ''} icon="phone" />
						<ProfileInfoItem
							label="Data de nascimento"
							value={user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('pt-BR') : ''}
							icon="calendar"
						/>
						<ProfileInfoItem label="Endereço" value={user.address || ''} icon="map-pin" />

						<Card.Footer className="mt-4">
							<TouchableOpacity
								activeOpacity={0.8}
								className="p-2"
								onPress={() => navigation.navigate('editProfile')}
							>
								<Text className="self-center font-inter-bold text-lg text-blue-500">
									Editar informações
								</Text>
							</TouchableOpacity>
						</Card.Footer>
					</Card.Body>
				</Card>

				<View className="rounded-xl bg-white">
					<TouchableOpacity
						className="w-full flex-row items-center gap-4 rounded-t-xl border border-neutral-100 p-3"
						// onPress={() => navigation.navigate('home')}
					>
						<ProfileIcon icon="bell" color={'#d97706'} background="#fef3c7" />
						<Text className="font-inter-medium text-xl">Notificações</Text>
					</TouchableOpacity>

					<TouchableOpacity
						className=" text-pu w-full flex-row items-center gap-4 rounded-b-xl border border-neutral-100 p-3"
						onPress={() => navigation.navigate('security')}
					>
						<ProfileIcon icon="lock" color={'#a855f7'} background="#f3e8ff" />
						<Text className="font-inter-medium text-xl">Segurança</Text>
					</TouchableOpacity>
				</View>

				<Button variant="red" title="Sair" onPress={() => setIsModalVisible(true)}>
					<Feather name="log-out" size={20} color={'#ef4444'} className="mr-3" />
				</Button>
				<LogoutModal
					visible={isModalVisible}
					onClose={() => setIsModalVisible(false)}
					onConfirm={confirmLogout}
				/>
			</SafeAreaView>
		</ScrollView>
	)
}
