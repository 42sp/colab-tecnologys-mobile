import { api } from '@/libs/axios/axios'

type SignInPost = {
	password: string
	email: string
}

export async function postSignIn(data: SignInPost) {
	const response = await api.post(`/authentication`, {
		strategy: 'local',
		...data,
	})
	await new Promise((resolve) => setTimeout(resolve, 1000))
	return response.data
}
