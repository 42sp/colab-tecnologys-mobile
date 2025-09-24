import { api } from '@/libs/axios/axios'

interface PatchTasksProps {
	id?: string
	service_id?: string
	worker_id?: string
	completion_date?: string
	task_percentage?: number
	status?: 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected'
	approver_id?: string
}

interface PatchTasksResponse {
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
}

export async function patchTasks({ id, ...props }: PatchTasksProps) {
	const response = await api.patch<PatchTasksResponse>(`/tasks/${id}`, { ...props })
	return response.data
}
