import { api } from '@/libs/axios/axios'

export interface Services {
	id: string
	work_id: string
	service_id: string
	service_type_id: string
	tower: string
	floor: string
	apartment: string
	measurement_unit: string
	service_description: string | null
	stage: string
	thickness: string
	labor_quantity: string
	material_quantity: string
	worker_quantity: number
	bonus: string
	unit_of_measure: string
	material_unit: string
	is_active: boolean
	is_done: boolean
	created_at: Date
	updated_at: Date
	acronym: string
	environment_type: string
}

// interface GetServicesResponse {
// 	// total: number
// 	// limit: number
// 	// skip: number
// 	data: Services[]
// }

export async function getServices() {
	const response = await api.get<Services[]>('/services')
	return response.data
}
