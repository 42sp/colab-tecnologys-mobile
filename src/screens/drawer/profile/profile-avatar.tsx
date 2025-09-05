import { Image, Text, TouchableNativeFeedback, View } from 'react-native'
import { useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { usePostUploads } from '@/api/post-uploads'
import { useGetProfile } from '@/api/get-profile-user'
import { env } from '@/libs/env'
import { launchImageLibraryAsync, useMediaLibraryPermissions } from 'expo-image-picker'
import { useImageManager } from '@/utils.ts/useImageManager'

type ProfileAvatarProps = {
	avatar: string
	name: string
}

const API_URL = env.EXPO_PUBLIC_API_URL

export function ProfileAvatar({ avatar, name }: ProfileAvatarProps) {
	const { profile, getProfile } = useGetProfile()
	const { upload } = usePostUploads();
	const { setManipulatedImage, renderedImage } = useImageManager();
	const [_status, _requestPermission] = useMediaLibraryPermissions();

	useEffect(() => {
		getProfile();
	}, [profile]);

	useEffect(() => {
		const handleRenderedImage = async () => {
			console.log("Profile photo:", renderedImage);
			const result = await upload({ data: { uri: renderedImage } });
			if (result) {
				await getProfile();
			}
		};
		handleRenderedImage();
	}, [renderedImage]);

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
		<View className="items-center">
			<TouchableNativeFeedback onPress={updateAvatar} useForeground>
				<View className="size-36 rounded-full border border-neutral-100 bg-white p-1" >
					<Image source={{ uri: renderedImage ? renderedImage : photoUrl || avatar }} className="h-full w-full rounded-full" />
					<View
						className="mt-[-35px] h-10 w-10 self-end rounded-full bg-zinc-900 items-center justify-center"
					>
						<Feather
							name="edit"
							color={'#ffff'}
							size={14}
						/>
					</View>
				</View>
			</TouchableNativeFeedback>
			<View className="my-3 items-center">
				<Text className="font-inter-bold text-3xl">{name}</Text>
			</View>
		</View>
	)
}