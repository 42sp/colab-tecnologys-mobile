import { api } from '@/libs/axios/axios'

interface CreateUserProps {
	cpf: string
	password: string
	name: string | null
	email: string | null
	phone: string | null
	roleId: string | null
}

interface UserResponse {
	id: string
	cpf: string
	profile_id: string
	is_active: boolean
	is_available: boolean
	created_at: Date
	updated_at: Date
	accessToken: string
}

export async function createUser(data: CreateUserProps) {
	const response = await api.post<UserResponse>('/users', data)
	return response.data
}
