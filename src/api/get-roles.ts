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

type GetRolesProps = {
	id?: string
}

export async function getRoles({ id }: GetRolesProps = {}) {
	const url = id ? `/roles/${id}` : `/roles`
	const response = await api.get<GetRolesResponse>(url)
	return response.data
}
