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
import { getProfile } from '@/api/get-profile'
import { useEffect, useState } from 'react'

export default function ProfileScreen() {
	const { token, id } = useSelector((state: RootState) => state.authSignIn)
	const [profile, setProfile] = useState<any>(null)
	useEffect(() => {
		async function getDataProfile() {
			try {
				const profile = await getProfile(token, id)
				setProfile(profile)
			} catch (err) {
				console.log(err)
			}
		}
		getDataProfile()
	}, [])

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<SafeAreaView className="flex-1 gap-5 bg-[#F9FAFB] p-5">
				<ProfileAvatar
					avatar="https://randomuser.me/portraits/men/1.jpg"
					name={profile?.name}
					email={profile?.email}
				/>

				<Card className="flex-1">
					<Card.Header>
						<Text className="font-inter-bold text-xl">Informações pessoais</Text>
					</Card.Header>

					<Card.Body className="gap-4">
						<ProfileInfoItem label="Nome completo" value={profile?.name} icon="user" />
						<ProfileInfoItem label="E-mail" value={profile?.email} icon="mail" />
						<ProfileInfoItem label="Número de telefone" value={profile?.phoneNumber} icon="phone" />
						<ProfileInfoItem label="Data de nascimento" value="15/05/1988 -" icon="calendar" />
						<ProfileInfoItem label="Endereço" value={profile?.address} icon="map-pin" />

						<Card.Footer className="mt-4">
							<TouchableOpacity activeOpacity={0.8} className="p-2">
								<Text className="self-center font-inter-bold text-lg text-blue-500">
									Editar informações
								</Text>
							</TouchableOpacity>
						</Card.Footer>
					</Card.Body>
				</Card>

				<View className="rounded-xl bg-white">
					<TouchableOpacity className="w-full flex-row items-center gap-4 rounded-t-xl border border-neutral-100 p-3">
						<ProfileIcon icon="bell" color={'#d97706'} background="#fef3c7" />
						<Text className="font-inter-medium text-xl">Notificações</Text>
					</TouchableOpacity>

					<TouchableOpacity className=" text-pu w-full flex-row items-center gap-4 rounded-b-xl border border-neutral-100 p-3">
						<ProfileIcon icon="lock" color={'#a855f7'} background="#f3e8ff" />
						<Text className="font-inter-medium text-xl">Segurança</Text>
					</TouchableOpacity>
				</View>

				<Button variant="red" title="Sair" className="">
					<Feather name="log-out" size={20} color={'#ef4444'} className="mr-3" />
				</Button>
			</SafeAreaView>
		</ScrollView>
	)
}
