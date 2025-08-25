import { api } from '@/libs/axios/axios'

export async function getProfile(token: string | null, id: string | null) {
	const response = await api.get(`/access/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return response.data
}
