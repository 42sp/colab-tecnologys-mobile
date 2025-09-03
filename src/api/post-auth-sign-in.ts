import useAxios from '@/hooks/use-axios'

interface Response {
	accessToken: string
	authentication: {
		payload: {
			exp: string
		}
	}
	user: {
		id: string
	}
}

export const usePostAuthSignIn = () => {
	return useAxios<Response>({ url: 'authentication', method: 'post' }, { manual: true })
}
