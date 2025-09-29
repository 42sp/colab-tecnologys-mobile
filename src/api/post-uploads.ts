import { api } from '@/libs/axios/axios'

interface UploadsProps {
	uri: string
	userId?: string
}

interface UploadsResponse {
	contentType: string
	photo: string
}

export async function uploads(data: UploadsProps) {
	try {
		const response = await api.post<UploadsResponse>('/uploads', data)
		return response.data
	} catch (error) {
		console.log('Error uploading image:', error)
		throw error
	}
}
