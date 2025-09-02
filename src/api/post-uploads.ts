import { api } from '@/libs/axios/axios'

type UploadsPost = {
  id: string | null
  uri: string
  token: string | null
}

export async function postUploads (data: UploadsPost){

		const response = await api.post(`/uploads`, {
			id: data.id,
			uri: data.uri,
		},
		{
			headers: {
				Authorization: `Bearer ${data.token}`,
			},
		}
	)
		await new Promise((resolve) => setTimeout(resolve, 1000))
		return (response.data)

}