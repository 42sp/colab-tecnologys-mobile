import { api } from '@/libs/axios/axios'

export interface Roles {
	id: string
	role_name: string
	role_description: string
	hierarchy_level: number
	is_active: boolean
	updated_at: string
	created_at: string
}

export interface GetRolesResponse {
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
		const response = await api.get<Roles>(`/roles/${id}`)
		return response.data
	} else {
		const response = await api.get<GetRolesResponse>(`/roles`)
		console.log('response', response.data.data)
		return response.data.data.filter((role) => role.id !== '7bbe6f8a-f4f6-4dcd-85ca-ca692a400942')
	}
}
