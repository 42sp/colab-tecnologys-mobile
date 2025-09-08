import { Image, Text, TouchableNativeFeedback, View } from 'react-native'
import { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { uploads } from '@/api/post-uploads'
import { getProfile } from '@/api/get-profile'
import { env } from '@/libs/env'
import { launchImageLibraryAsync, useMediaLibraryPermissions } from 'expo-image-picker'
import { useImageManager } from '@/hook/useImageManager'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import { updateProfile } from '@/libs/redux/user-profile/user-profile-slice'

type ProfileAvatarProps = {
	avatar: string
	name: string
}

const API_URL = env.EXPO_PUBLIC_API_URL

export function ProfileAvatar({ avatar, name }: ProfileAvatarProps) {
	const { setManipulatedImage, renderedImage } = useImageManager()
	const [_status, _requestPermission] = useMediaLibraryPermissions()
	const [imageUri, setImageUri] = useState<string>('')
	const profile = useSelector((state: RootState) => state.userProfile)
	const dispatch = useDispatch()

	useEffect(() => {
		const handleRenderedImage = async () => {
			if (!imageUri) return
			try {
				const result = await uploads({ uri: imageUri })
				if (result) {
					const user = await getProfile()
					dispatch(updateProfile({ photo: result.id, updatedAt: user.data[0].updated_at }))
				}
			} catch (error) {
				console.log('error returned profile-avatar: ', error)
			}
		}
		handleRenderedImage()
	}, [renderedImage, imageUri])
	const photoUrl = profile?.photo
		? `${API_URL}/images/${profile.photo}?t=${profile.updatedAt}`
		: avatar

	async function updateAvatar() {
		const result = await launchImageLibraryAsync({
			mediaTypes: 'images',
			base64: true,
			allowsEditing: true,
			quality: 1,
			aspect: [1, 1],
		})

		console.log(
			'Resultado da imagem:',
			result?.assets && result.assets[0] ? result.assets[0].assetId : null,
		)

		if (!result.canceled && result.assets[0].base64) {
			const base64 = result.assets[0].base64
			setManipulatedImage({
				image: `data:image/png;base64,${base64}`,
				options: { width: 300, height: 300, compress: 0.8, format: 'jpeg' },
			})
			setImageUri(`data:image/png;base64,${base64}`)
		}
	}

	return (
		<View className="items-center">
			<TouchableNativeFeedback onPress={updateAvatar} useForeground>
				<View className="size-36 rounded-full border border-neutral-100 bg-white p-1">
					<Image
						source={{ uri: renderedImage ? renderedImage : photoUrl}}
						className="h-full w-full rounded-full"
					/>
					<View className="mt-[-35px] h-10 w-10 items-center justify-center self-end rounded-full bg-zinc-900">
						<Feather name="edit" color={'#ffff'} size={14} />
					</View>
				</View>
			</TouchableNativeFeedback>
			<View className="my-3 items-center">
				<Text className="font-inter-bold text-3xl">{name}</Text>
			</View>
		</View>
	)
}
