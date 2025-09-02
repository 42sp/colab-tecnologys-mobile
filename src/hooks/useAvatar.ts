import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState, useCallback } from 'react'
import { getProfile } from '@/api/get-profile-user'
import { postUploads } from '@/api/post-uploads'

const EXT_FROM = (mime?: string) => mime?.split('/')[1]?.toLowerCase() || 'jpg'

type useAvatarProps = {
	token: string | null
	API_URL: string
	userId: string | null
}

export function useAvatar({ token, API_URL, userId }: useAvatarProps) {
	const [image, setImage] = useState('')

	const loadProfileImage = useCallback(async () => {
		if (!token) return
		const profile = await getProfile({ token })
		if (!profile?.photo) return setImage('')
		const photoUrl = `${API_URL}/images/${profile.photo}`
		setImage(photoUrl)
	  }, [token, API_URL])

	useEffect(() => { loadProfileImage() }, [loadProfileImage])

	const uploadAvatar= useCallback(async () => {
		if (!token || !userId) return
		const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (!permission.granted) return

		let result = await ImagePicker.launchImageLibraryAsync({
			base64: true,
			quality: 1,
		  });
		if (result.canceled) return

		try
			{
			const asset = result.assets[0]
			const mime = asset.mimeType || 'image/jpeg'

			const ext = EXT_FROM(mime)
			const fileId =asset.fileName?.trim() || `${userId}.${ext}`
			const uri = `data:${mime};base64,${asset.base64}`

			await postUploads({ id: fileId, uri, token })
			await loadProfileImage()

		  } catch (error){
			console.error("Upload error: ", error)
		  }

	},[userId, token, loadProfileImage])

	return { image, uploadAvatar, reload: loadProfileImage }
}