import { Image, Text, View } from 'react-native'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Feather } from '@expo/vector-icons'
import { usePostUploads } from '@/api/post-uploads'
import { useGetProfile } from '@/api/get-profile-user'
import { pickAndCompressImage } from '@/utils.ts/imageManager'
import { env } from '@/libs/env'

type ProfileAvatarProps = {
	avatar: string
	name: string
}

const API_URL = env.EXPO_PUBLIC_API_URL

export function ProfileAvatar({ avatar, name }: ProfileAvatarProps) {
	const { profile, getProfile } = useGetProfile()
	const { upload } = usePostUploads();

	useEffect(() => {
		getProfile();
	}, [profile]);

	const photoUrl = profile?.photo
		? `${API_URL}/images/${profile.photo}?t=${profile.updated_at}`
		: avatar;

	async function updateAvatar() {
		const result = await pickAndCompressImage();
		if (!result) return;

		const { fileId, uri } = result;
		await upload({ data: { id: fileId, uri } });
		await getProfile();
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