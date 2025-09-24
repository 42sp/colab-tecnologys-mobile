import { api } from '@/libs/axios/axios'

interface CreateUserProps {
	cpf: string
	password: string
}

interface UserResponse {
	id: string
	cpf: string
	profile_id: string
	is_active: boolean
	is_available: boolean
	created_at: Date
	updated_at: Date
}

export async function createUser({ cpf, password }: CreateUserProps) {
	const response = await api.post<UserResponse>('/users', { cpf, password })
	return response.data
}
