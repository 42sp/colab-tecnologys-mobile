import { api } from '@/libs/axios/axios'

type SignInPost = {
  password: string
  email: string
}

export async function postSignIn (data: SignInPost){
	try {
		const response = await api.post(`/authentication`, {
			strategy: "local",
			...data
		})
		console.log(response.data)
		await new Promise((resolve) => setTimeout(resolve, 1000))
		return (response.data.accessToken)
	} catch (err){
		console.log(err)
	}
}