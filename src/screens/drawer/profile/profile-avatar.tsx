import { Image, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Feather } from '@expo/vector-icons'
import { uploads } from '@/api/post-uploads'
import { getProfile } from '@/api/get-profile'
import { pickAndCompressImage } from '@/utils.ts/imageManager'
import { env } from '@/libs/env'

type ProfileAvatarProps = {
	avatar: string
	name: string
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

export function ProfileAvatar({ avatar, name }: ProfileAvatarProps) {
	const [profile, setProfile] = useState<TypeProfile>()
	const fetchProfile = async () => {
		try {
			const response = await getProfile()
			setProfile(response.data[0])
		} catch (error) {
			console.log('ProfileAvatar 1st getProfiel: ', error)
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
			const response = await getProfile()
			setProfile(response.data[0])
		} catch (error) {
			console.log('ProfileAvatar 2nd getProfile and uploads: ', error)
		}
	}

	return (
		<View className="items-center">
			<View className="size-36 rounded-full border border-neutral-100 bg-white p-1">
				<Image source={{ uri: photoUrl || avatar }} className="h-full w-full rounded-full" />
				<Button variant="rounded" className="mt-[-35px] h-10 w-10 self-end" onPress={updateAvatar}>
					<Feather
						name="edit"
						color={'#ffff'}
						size={14}
						onPress={() => console.log('avatar pressionado')}
					/>
				</Button>
			</View>

			<View className="my-3 items-center">
				<Text className="font-inter-bold text-3xl">{name}</Text>
			</View>
		</View>
	)
}
