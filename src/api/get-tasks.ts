import { api } from '@/libs/axios/axios'

interface Task {
	id?: string
	service_id?: string
	worker_id?: string
	approver_id?: string
	status?: 'pending' | 'in_progress' | 'completed' | 'approved' | 'rejected'
	completion_date?: Date
	task_percentage?: number
	updated_at?: Date
	created_at?: Date
}

export async function getTasks() {
	const response = await api.get<Task[]>('/tasks')
	return response.data
}
