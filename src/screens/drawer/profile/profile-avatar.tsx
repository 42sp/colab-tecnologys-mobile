import { Image, Text, TouchableNativeFeedback, View } from 'react-native'
import { use, useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { uploads } from '@/api/post-uploads'
import { launchImageLibraryAsync, useMediaLibraryPermissions } from 'expo-image-picker'
import { useImageManager } from '@/hook/useImageManager'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import { setPhoto, updateProfile } from '@/libs/redux/user-profile/user-profile-slice'
import { LogModal } from '@/components/ui/log-modal'
import { API_URL } from '@env'

type ProfileAvatarProps = {
	avatar: number
	name: string
}

export function ProfileAvatar({ avatar, name }: ProfileAvatarProps) {
	const { setManipulatedImage, renderedImage } = useImageManager()
	//const [_status, _requestPermission] = useMediaLibraryPermissions()
	const { userId, photo } = useSelector((state: RootState) => state.userProfile)
	const dispatch = useDispatch()
	const [image, setImage] = useState<string | undefined>(undefined)
	const [modal, setModal] = useState<{
		visible: boolean
		status: 'error' | 'success'
		description: string
	}>({ visible: false, status: 'error', description: '' })

	useEffect(() => {
		const handleRenderedImage = async () => {
			if (!renderedImage) return
			try {
				const result = await uploads({
					uri: `data:image/jpeg;base64,${renderedImage.base64}`,
					userId: userId,
				})
				if (result) {
					console.log('result upload profile-avatar: ', result)
					dispatch(setPhoto(result.photo))
					setModal({
						visible: true,
						status: 'success',
						description: 'Foto de perfil alterada!',
					})
					setImage(result.photo)
				}
			} catch (error) {
				console.log('error returned profile-avatar: ', error)
				setImage(undefined)
				setModal({
					visible: true,
					status: 'error',
					description: 'Não foi possível alterar sua foto de perfil.',
				})
			}
		}
		handleRenderedImage()
	}, [renderedImage])

	useEffect(() => {
		console.log('renderedImage no profile-avatar: ', `${API_URL}/images/${photo}`)
	}, [photo])

	//const imageUrl = image ? { uri: image } : photoUrl ? { uri: photoUrl } : avatar

	async function updateAvatar() {
		const result = await launchImageLibraryAsync({
			mediaTypes: 'images',
			base64: true,
			allowsEditing: true,
			quality: 1,
			aspect: [1, 1],
		})

		console.log(
			'Resultado da imagem in profile:',
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
		<View className="items-center">
			<TouchableNativeFeedback onPress={updateAvatar} useForeground>
				<View className="size-36 rounded-full border border-neutral-100 bg-white p-1">
					<Image
						source={{ uri: `${API_URL}/images/${photo}` }}
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
			<LogModal
				visible={modal.visible}
				status={modal.status}
				description={modal.description}
				onClose={() => setModal({ visible: false, status: 'error', description: '' })}
			/>
		</View>
	)
}
