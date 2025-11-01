import { api } from '@/libs/axios/axios'

export interface GetReportParams {
	period?: 'day' | 'week' | 'month',
	worker_id?: string,
	periodProduction?: 'week' | 'month',
}

export const getReport = async (params: GetReportParams) => {
  const response = await api.get('/tasks/report', { params })
  return response.data
}
