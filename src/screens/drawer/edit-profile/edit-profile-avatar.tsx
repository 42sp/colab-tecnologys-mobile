import { Text, View, Image, TouchableOpacity } from 'react-native'
// import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'
// import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '@/libs/redux/store'
// import { postUploads } from '@/api/post-uploads'
// import { getProfile } from '@/api/get-profile-user'
import { env } from '@/libs/env'
import { useAvatar } from '@/hooks/useAvatar';

type EditProfileAvatarProps = {
	avatar: string
}

const API_URL = env.EXPO_PUBLIC_API_URL

export function EditProfileAvatar({ avatar }: EditProfileAvatarProps) {
	// const [image, setImage] = useState('')
	const { id, token } = useSelector((state: RootState) => state.authSignIn)
	const { image, uploadAvatar } = useAvatar({ token, API_URL, userId: id })

	// useEffect(() => {
	// 	async function setImageAvatar (){
	// 		const profile = await getProfile({token})

	// 		const photoUrl = `${API_URL}/images/${profile.photo}`
	// 		setImage(photoUrl)
	// 	}
	// 	setImageAvatar()
	//   }, [token])

	// async function uploadAvatar() {
	// 	const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

	// 	if (!permission.granted){
	// 		console.log("You've refused to allow this app to access your photos.")
	// 		return
	// 	}
	// 	let result = await ImagePicker.launchImageLibraryAsync({
	// 		base64: true,
	// 		quality: 1,
	// 	  });

	// 	  if (!result.canceled) {
	// 		const asset = result.assets[0]
	// 		const mimeType = asset.mimeType || 'image/jpeg'

	// 		const fileId = asset.fileName
	// 		const base64Prefix = `data:${mimeType};base64,${asset.base64}`

	// 		const data = {
	// 			id: fileId || `${id}.${mimeType.split('/')[1]}`,
	// 			uri: base64Prefix,
	// 			token: token,
	// 		  }

	// 		await postUploads(data)
	// 	  }
	// 	  return
	// }

	return (
		<View className="items-center gap-3">
			<View className="items-center">
				<View className="size-36 rounded-full border border-neutral-100 bg-white p-1">
					<Image source={{ uri: image || avatar }} className="h-full w-full rounded-full" />
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
