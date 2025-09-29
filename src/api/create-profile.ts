import { api } from '@/libs/axios/axios'

interface CreateProfileProps {
	name: string
	email?: string
	phone: string
	date_of_birth?: string
	role_id?: string
	user_id?: string
	registration_code?: string
	postcode?: string
	address?: string
	city?: string
	state?: string
}

interface CreateProfileResponse {
	id: string
	user_id: string
	role_id: string
	name: string
	email: string
	registration_code?: string
	date_of_birth: Date
	phone: string
	photo?: string
	address: string
	city: string
	state: string
	postcode: string
	created_at: Date
	updated_at: Date
}

export async function createProfile(props: CreateProfileProps) {
	const response = await api.post<CreateProfileResponse>('/profile', { ...props })
	return response.data
}
