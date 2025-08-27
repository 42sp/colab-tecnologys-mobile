import { api } from '@/libs/axios/axios'

type ProfilePost = {
	name: string
	email: string
	cpf: string
	phone: string
	jobTitle: string
	password: string
}

export async function postProfile(data: ProfilePost) {
	const response = await api.post(`/user/`, {
		...data,
	})
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return response.data
}
