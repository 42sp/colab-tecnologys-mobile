import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useGetProfile } from '@/api/get-profile-user'
import { usePostUploads } from '@/api/post-uploads';
import { env } from '@/libs/env'
import { launchImageLibraryAsync, useMediaLibraryPermissions } from 'expo-image-picker'
import { useImageManager } from '@/utils.ts/useImageManager'

type EditProfileAvatarProps = {
	avatar: string
}

const API_URL = env.EXPO_PUBLIC_API_URL

export function EditProfileAvatar({ avatar }: EditProfileAvatarProps) {
	const { profile, getProfile } = useGetProfile()
	const { upload } = usePostUploads();
	const { setManipulatedImage, renderedImage } = useImageManager();
	const [_status, _requestPermission] = useMediaLibraryPermissions();

	useEffect(() => {
		getProfile();
	}, [profile]);

	const photoUrl = profile?.photo
		? `${API_URL}/images/${profile.photo}?t=${profile.updated_at}`
		: avatar;

	async function updateAvatar() {
			const result = await launchImageLibraryAsync({
				mediaTypes: 'images',
				base64: true,
				allowsEditing: true,
				quality: 1,
				aspect: [1, 1],
			  })
	
			console.log("Resultado da imagem:", result?.assets && result.assets[0] ? result.assets[0].assetId : null);
	
			if (!result.canceled && result.assets[0].base64) {
				const base64 = result.assets[0].base64;
				setManipulatedImage({image: `data:image/png;base64,${base64}`, options: {width:300, height:300, compress: 0.8, format: 'jpeg'}});
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
