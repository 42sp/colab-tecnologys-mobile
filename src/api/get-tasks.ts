import { api } from '@/libs/axios/axios'

export interface Task {
	id?: string
	service_id?: string
	worker_id?: string
	approver_id?: string
	status?: 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected'
	completion_date?: Date
	task_percentage?: number
	updated_at?: string
	created_at?: string

	worker_name?: string
	construction_name?: string
	construction_address?: string
	service_tower?: string
	service_apartment?: string
	service_floor?: string
	service_stage?: string
	service_type?: string
	service_acronym?: string
}

export interface TasksServices {
		id?: string
	service_id?: string
	worker_id?: string
	approver_id?: string
	status?: 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected'
	completion_date?: Date
	task_percentage?: number
	updated_at?: string
	created_at?: string

	worker_name?: string
	construction_name?: string
	construction_address?: string
	service_tower?: string
	service_apartment?: string
	service_floor?: string
	service_stage?: string
	service_type?: string
	service_acronym?: string
}

export async function getTasks(signal: any) {
	const response = await api.get<TasksServices[]>('/tasks_services', { signal })
	// console.log("Response", response)
	return response.data
}
