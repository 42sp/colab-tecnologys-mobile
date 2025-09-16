import { api } from '@/libs/axios/axios'

interface TaskData {
	service_id: string
	worker_id: string
	completion_date: string
	task_percentage: number
	status?: 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected'
	approver_id?: string
}

interface TaskResponse {
	id: string
	service_id: string
	worker_id: string
	approver_id?: string
	status: string
	completion_date: string
	task_percentage: number
	created_at: string
	updated_at: string
	worker_name: string
	construction_name: string
	construction_address: string
	service_tower: string
	service_apartment: string
	service_floor: string
	service_stage: string
	service_type: string
}

export async function createTask(taskData: TaskData) {
	const response = await api.post<TaskResponse>('/tasks', taskData)
	return response.data
}
