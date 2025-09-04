import { api } from '@/libs/axios/axios'

interface Profile {
	id: string
	user_id: string
	name: string
	email: string
	date_of_birth: string
	registration_code: string
	phone: string
	photo: string | null
	address: string
	city: string
	state: string
	postcode: string
	created_at: string
	updated_at: string
}

interface ProfileResponse {
	total: number
	limit: number
	skip: number
	data: Profile[]
}

export async function getProfile() {
	const response = await api.get<ProfileResponse>('/profile')
	return response.data
}
