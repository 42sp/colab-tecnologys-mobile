import { api } from '@/libs/axios/axios'

type ProfileGet = {
	token: string | null
  }

export async function getProfile (data: ProfileGet){
		const response = await api.get(`/profile`,
		{
			headers: {
				Authorization: `Bearer ${data.token}`,
			},
		})
		await new Promise((resolve) => setTimeout(resolve, 1000))
		return (response.data)
}