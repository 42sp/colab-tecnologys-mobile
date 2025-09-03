import { Text, View, Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { usePostUploads } from '@/api/post-uploads'
import { useGetProfile } from '@/api/get-profile-user'
import { env } from '@/libs/env'

type EditProfileAvatarProps = {
	avatar: string
}

const API_URL = env.EXPO_PUBLIC_API_URL

export function EditProfileAvatar({ avatar }: EditProfileAvatarProps) {
	const { profile, getProfile } = useGetProfile()
	const { upload } = usePostUploads();
	useEffect(() => {
		getProfile();
	}, []);

	const photoUrl = profile?.photo
		? `${API_URL}/images/${profile.photo}?t=${profile.updated_at}`
		: null;

	async function uploadAvatar() {
		const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!permission.granted) return

		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [1, 1],
			base64: true,
			quality: 0.5,
		});

		if (!result.canceled) {
			const asset = result.assets[0]
			const mimeType = asset.mimeType || 'image/jpeg'
			const getFileExtension = (mimeType?: string) => mimeType?.split('/')[1]?.toLowerCase() || 'jpg';

			const fileId = `${Math.random().toString(36).slice(2, 8)}.${getFileExtension(mimeType)}`
			const uri = `data:${mimeType};base64,${asset.base64}`

			await upload({ data: { id: fileId, uri } });
			getProfile()
		}
	}

	return (
		<View className="items-center gap-3">
			<View className="items-center">
				<View className="size-36 rounded-full border border-neutral-100 bg-white p-1">
					<Image source={{ uri: photoUrl || avatar }} className="h-full w-full rounded-full" />
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

			<TouchableOpacity onPress={uploadAvatar}>
				<Text className="font-inter-bold text-xl text-gray-500">Alterar foto de perfil</Text>
			</TouchableOpacity>
		</View>
	)
}
