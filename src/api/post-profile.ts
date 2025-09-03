import useAxios from '@/hooks/use-axios'

interface Response {
	name: string
	email: string | null
	date_of_birth: string
	cpf: string
	phone: string
	role_id: string
	user_id: string
}

export const usePostProfile = () => {
	return useAxios<Response>({ url: 'profile', method: 'post' }, { manual: true })
}
