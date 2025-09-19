import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { env } from '@/libs/env'
import { launchImageLibraryAsync, useMediaLibraryPermissions } from 'expo-image-picker'
import { useImageManager } from '@/hook/useImageManager'
import { uploads } from '@/api/post-uploads'
import { getProfile } from '@/api/get-profile'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import { updateProfile } from '@/libs/redux/user-profile/user-profile-slice'
import { LogModal } from '@/components/ui/log-modal'

type EditProfileAvatarProps = {
	avatar: number
}

const API_URL = env.EXPO_PUBLIC_API_URL

export function EditProfileAvatar({ avatar }: EditProfileAvatarProps) {
	const { setManipulatedImage, renderedImage } = useImageManager()
	//const [_status, _requestPermission] = useMediaLibraryPermissions()
	const profile = useSelector((state: RootState) => state.userProfile)
	const dispatch = useDispatch()
	const [image, setImage] = useState<string | null>(null)
	const [modal, setModal] = useState<{
		visible: boolean
		status: 'error' | 'success'
		description: string
	}>({ visible: false, status: 'error', description: '' })

	useEffect(() => {
		const handleRenderedImage = async () => {
			if (!renderedImage) return
			setImage(renderedImage.uri)
			try {
				const result = await uploads({ uri: `data:image/jpeg;base64,${renderedImage.base64}` })
				if (result) {
					const user = await getProfile()
					dispatch(updateProfile({ photo: user.data[0].photo, updatedAt: user.data[0].updated_at }))
					setImage(null)
					setModal({
						visible: true,
						status: 'success',
						description: 'Foto de perfil alterada!',
					})
				}
			} catch (error) {
				console.log('error returned edit-profile-avatar: ', error)
				setImage(null)
				setModal({
					visible: true,
					status: 'error',
					description: 'Não foi possível alterar sua foto de perfil.',
				})
			}
		}
		handleRenderedImage()
	}, [renderedImage])

	const photoUrl = profile?.photo
		? `${API_URL}images/${profile.photo}?t=${profile.updatedAt}`
		: null

	const imageUrl = image ? { uri: image } : photoUrl ? { uri: photoUrl } : avatar

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
				options: { width: 300, height: 300, compress: 0.5, format: 'jpeg' },
			})
		}
	}

	return (
		<View className="items-center gap-5 ">
			<View className="items-center">
				<View className="size-36 rounded-full border border-neutral-100 bg-white p-1">
					<Image source={imageUrl} className="h-full w-full rounded-full" />
					<Button variant="rounded" className="mt-[-35px] h-10 w-10 self-end">
						<Feather name="user" color={'#ffff'} size={14} />
					</Button>
				</View>
			</View>

			<TouchableOpacity onPress={updateAvatar}>
				<Text className="font-inter-bold text-xl text-gray-500">Alterar foto de perfil</Text>
			</TouchableOpacity>
			<LogModal
				visible={modal.visible}
				status={modal.status}
				description={modal.description}
				onClose={() => setModal({ visible: false, status: 'error', description: '' })}
			/>
		</View>
	)
}
