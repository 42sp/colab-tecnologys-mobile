import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { pickAndCompressImage } from '@/utils.ts/imageManager'
import { getProfile } from '@/api/get-profile'
import { uploads } from '@/api/post-uploads'
import { env } from '@/libs/env'

type EditProfileAvatarProps = {
	avatar: string
}

interface TypeProfile {
	id: string
	user_id: string
	name: string
	email: string
	date_of_birth: Date
	registration_code: string
	phone: string
	photo: string
	address: string
	city: string
	state: string
	postcode: string
	created_at: Date
	updated_at: Date
}

const API_URL = env.EXPO_PUBLIC_API_URL

export function EditProfileAvatar({ avatar }: EditProfileAvatarProps) {
	const [profile, setProfile] = useState<TypeProfile>()
	const fetchProfile = async () => {
		try {
			const response = await getProfile()
			setProfile(response.data[0])
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		fetchProfile()
	}, [])

	const photoUrl = profile?.photo
		? `${API_URL}/images/${profile.photo}?t=${profile.updated_at}`
		: avatar

	async function updateAvatar() {
		const result = await pickAndCompressImage()
		if (!result) return

		const { fileId, uri } = result
		try {
			await uploads({ id: fileId, uri })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<View className="items-center gap-3">
			<View className="items-center">
				<View className="size-36 rounded-full border border-neutral-100 bg-white p-1">
					<Image source={{ uri: photoUrl }} className="h-full w-full rounded-full" />
					<Button variant="rounded" className="mt-[-35px] h-10 w-10 self-end">
						<Feather
							name="user"
							color={'#ffff'}
							size={14}
							onPress={() => console.log('avatar pressionado')}
						/>
					</Button>
				</View>
			</View>

			<TouchableOpacity onPress={updateAvatar}>
				<Text className="font-inter-bold text-xl text-gray-500">Alterar foto de perfil</Text>
			</TouchableOpacity>
		</View>
	)
}
