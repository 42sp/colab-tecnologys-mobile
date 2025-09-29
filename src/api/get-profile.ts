import { api } from '@/libs/axios/axios'

export interface Profile {
	id: string
	user_id: string
	name: string
	email: string
	date_of_birth: Date
	registration_code: string
	phone: string
	photo: string
	address: string
	city: string
	state: string
	postcode: string
	created_at: Date
	updated_at: Date
	role_id: string
}

interface ProfileResponse {
	total: number
	limit: number
	skip: number
	data: Profile[]
}

type GetProfileProps = {
	id?: string
	userId?: string
}

export async function getProfile({ id = '', userId }: GetProfileProps) {
	let response
	if (userId) {
		response = await api.get<ProfileResponse>(`/profile?user_id=${userId}`)
	} else {
		response = await api.get<ProfileResponse>(`/profile/${id}`)
	}
	return response.data
}
