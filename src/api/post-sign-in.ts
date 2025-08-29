import useAxios from '@/hook/use-axios'

interface Response {
	id: string
	email: string
	created_at: string
	updated_at: string
	role_id: string | null
	profile_id: string | null
	is_active: boolean
	is_available: boolean
}

export const usePostSignIn = () => {
	return useAxios<Response>({ url: 'users', method: 'post' }, { manual: true })
}
