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
import { useEffect, useState } from 'react'
import { deleteAuthSecureStore } from '@/libs/expo-secure-store/expo-secure-store'
import { LogModal } from '@/components/ui/log-modal'
import { mask } from 'react-native-mask-text'
import { LoadingModal } from '@/components/ui/loading-modal'
import { StackNavigationProp } from '@react-navigation/stack'
import { StackParamList } from '@/_layouts/stack/stack'
import { useNavigate } from '@/libs/react-navigation/useNavigate'

export default function ProfileScreen() {
	const user = useSelector((state: RootState) => state.userProfile)
	const { stack } = useNavigate();
	const dispatch = useDispatch()
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [modal, setModal] = useState<{
		visible: boolean
		status: 'error'
		description: string
	}>({ visible: false, status: 'error', description: '' })

	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 1000)
  		return () => clearTimeout(timer)
	}, [])

	async function confirmLogout() {
		try {
			setIsModalVisible(false)
			dispatch(resetAuth())
			await deleteAuthSecureStore([{ key: 'token' }, { key: 'profile_id' }, { key: 'userid' }])
		} catch (error) {
			console.log('Erro no secure-store ao fazer log out: ', error)
		}
	}

	return (
		<SafeAreaView className=" bg-[#F9FAFB]" edges={['bottom']}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className="flex-1 gap-5 px-5 py-10">
					<ProfileAvatar avatar={require('@/assets/default-avatar.png')} name={user.name || ''} />
					<Card className="flex-1">
						<Card.Header>
							<Text className="font-inter-bold text-xl">Informações pessoais</Text>
						</Card.Header>

						<Card.Body className="gap-4">
							<ProfileInfoItem label="Nome completo" value={user.name || ''} icon="user" isLoading={isLoading} />
							<ProfileInfoItem label="Email" value={user.email || ''} icon="mail"  isLoading={isLoading}/>
							<ProfileInfoItem label="Número de telefone" value={mask(user.phone || '', '(99) 9 9999-9999')} icon="phone" isLoading={isLoading} />
							<ProfileInfoItem
								label="Data de nascimento"
								value={
									user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('pt-BR') : ''
								}
								icon="calendar"
								isLoading={isLoading}
							/>
							<ProfileInfoItem label="Endereço" value={user.address || ''} icon="map-pin" isLoading={isLoading} />

							<Card.Footer className="mt-4">
								<TouchableOpacity
									activeOpacity={0.8}
									className="p-2"
									onPress={() => stack('editProfile')}
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
							onPress={() =>
								setModal({
									visible: true,
									status: 'error',
									description: 'Esta funcionalidade ainda não está disponível.',
								})
							}
						>
							<ProfileIcon icon="bell" color={'#d97706'} background="#fef3c7" />
							<Text className="font-inter-medium text-xl">Notificações</Text>
						</TouchableOpacity>

						<TouchableOpacity
							className=" text-pu w-full flex-row items-center gap-4 rounded-b-xl border border-neutral-100 p-3"
							onPress={() => stack('security')}
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
				</View>
				<LogModal
					visible={modal.visible}
					status={modal.status}
					description={modal.description}
					onClose={() => setModal({ visible: false, status: 'error', description: '' })}
				/>
				<LoadingModal visible={isLoading} />
			</ScrollView>
		</SafeAreaView>
	)
}
