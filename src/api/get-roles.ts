import { api } from '@/libs/axios/axios'

export interface Roles {
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
	if (id) {
		const response = await api.get<GetRolesResponse>(`/roles/${id}`)
		return response.data
	} else {
		const response = await api.get<Roles>(`/roles/${id}`)
		return response.data
	}
}
