import { api } from '@/libs/axios/axios'

interface UploadsProps {
	id: string
	uri: string
}

interface UploadsResponse {
	id: string
	uri: string
	size: number
	contentType: string
}

export async function uploads({ id, uri }: UploadsProps) {
	const response = await api.post<UploadsResponse>('/uploads', { id, uri })
	return response.data
}
