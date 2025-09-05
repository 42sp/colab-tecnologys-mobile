import { api } from '@/libs/axios/axios'

interface PatchUsersProps {
	id?: string
	cpf?: string
	password?: string
	role_id?: string
}

interface PatchUsersResponse {
	id: string
	cpf: string
	role_id: string
	profile_id: string
	is_active: boolean
	is_available: boolean
	created_at: Date
	updated_at: Date
}

export async function patchUsers({ id, ...rest }: PatchUsersProps) {
	const response = await api.post<PatchUsersResponse>(`/users/${id} `, { ...rest })
	return response.data
}
