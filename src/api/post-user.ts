import useAxios from '@/hooks/use-axios'

interface Response {
	id: string
	cpf: string
	created_at: string
	updated_at: string
	role_id: string
	profile_id: string | null
	is_active: boolean
	is_available: boolean
}

export const usePostUser = () => {
	return useAxios<Response>({ url: 'users', method: 'post' }, { manual: true })
}
