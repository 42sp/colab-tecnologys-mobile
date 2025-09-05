import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { env } from '@/libs/env'
import { launchImageLibraryAsync, useMediaLibraryPermissions } from 'expo-image-picker'
import { useImageManager } from '@/utils.ts/useImageManager'
import { uploads } from '@/api/post-uploads'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import { updateProfile } from '@/libs/redux/user-profile/user-profile-slice'

type EditProfileAvatarProps = {
	avatar: string
}

const API_URL = env.EXPO_PUBLIC_API_URL

export function EditProfileAvatar({ avatar }: EditProfileAvatarProps) {
	const { setManipulatedImage, renderedImage } = useImageManager()
	const [_status, _requestPermission] = useMediaLibraryPermissions()
	const [imageUri, setImageUri] = useState<string>('')
	const profile = useSelector((state: RootState) => state.userProfile)
	const dispatch = useDispatch()

	useEffect(() => {
		const handleRenderedImage = async () => {
			try {
				const result = await uploads({ uri: imageUri })
				if (result) {
					dispatch(updateProfile({ photo: result.id }))
				}
			} catch (error) {
				console.log('error returned edit-profile-avatar: ', error)
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
			const assets = result.assets[0]
			setManipulatedImage({
				image: `data:image/png;base64,${base64}`,
				options: { width: 300, height: 300, compress: 0.8, format: 'jpeg' },
			})
			setImageUri(`data:image/png;base64,${base64}`)
		}
	}

	return (
		<View className="items-center gap-3">
			<View className="items-center">
				<View className="size-36 rounded-full border border-neutral-100 bg-white p-1">
					<Image
						source={{ uri: renderedImage ? renderedImage : photoUrl }}
						className="h-full w-full rounded-full"
					/>
					<Button variant="rounded" className="mt-[-35px] h-10 w-10 self-end">
						<Feather name="user" color={'#ffff'} size={14} />
					</Button>
				</View>
			</View>

			<TouchableOpacity onPress={updateAvatar}>
				<Text className="font-inter-bold text-xl text-gray-500">Alterar foto de perfil</Text>
			</TouchableOpacity>
		</View>
	)
}
