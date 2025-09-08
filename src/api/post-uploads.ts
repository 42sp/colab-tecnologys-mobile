import { api } from '@/libs/axios/axios'

interface UploadsProps {
	uri: string
}

interface UploadsResponse {
	id: string
	uri: string
	size: number
	contentType: string
}

export async function uploads({ uri }: UploadsProps) {
	try {
		const response = await api.post<UploadsResponse>('/uploads', { uri })
		return response.data
	} catch (error) {
		console.log('Error uploading image:', error)
		throw error
	}
}
