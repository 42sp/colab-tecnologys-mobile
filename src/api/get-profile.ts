import { api } from '@/libs/axios/axios'

interface Profile {
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
