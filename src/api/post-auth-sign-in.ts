import useAxios from '@/hook/use-axios'

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

interface Return {
	token: string | null
	expiry: string | null
	id: string | null
}

export const usePostAuthSignIn = () => {
	const { data, loading, error, fetchData } = useAxios<Response>(
		{ url: 'authentication', method: 'post' },
		{ manual: true },
	)

	const value: Return = {
		token: data?.accessToken ?? null,
		expiry: data?.authentication.payload.exp ?? null,
		id: data?.user.id ?? null,
	}

	return { data: value, loading, error, fetchData }
}
