import { api } from '@/libs/axios/axios'

export interface Construction {
	id: string
	name: string
	address: string
	city: number
	state: string
	zip_code: string
	start_date: Date
	expected_end_date: Date
	description: string
	is_active: boolean
	updated_at: Date
	created_at: Date
}

interface GetConstructionResponse {
	total: number
	limit: number
	skip: number
	data: Construction[]
}

export async function getConstructions() {
	const response = await api.get<GetConstructionResponse>('/constructions')
	return response.data
}
