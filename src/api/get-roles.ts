import { api } from '@/libs/axios/axios'

interface Roles {
	id: string
	role_name: string
	role_description: string
	hierarchy_level: number
	is_active: boolean
	updated_at: Date
	created_at: Date
}

interface GetRolesResponse {
	total: number
	skip: number
	limit: number
	data: Roles[]
}

export async function getRoles() {
	const response = await api.get<GetRolesResponse>('/roles')
	return response.data
}
