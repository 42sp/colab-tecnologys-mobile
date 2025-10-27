import { api } from '@/libs/axios/axios'

export const getReport = async () => {
  const response = await api.get('/tasks/report')
  return response.data
}
