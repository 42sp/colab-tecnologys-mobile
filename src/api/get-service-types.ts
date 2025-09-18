import { api } from '@/libs/axios/axios'

export interface ServiceTypes {
	id: string
	service_name: string
	service_description: string
	is_active: boolean
	created_at: Date
	updated_at: Date
}

interface ServiceTypesResponse {
	total: number
	limit: number
	skip: number
	data: ServiceTypes[]
}

export async function getServiceTypes() {
	const response = await api.get<ServiceTypesResponse>('/service-types')
	return response.data
}
