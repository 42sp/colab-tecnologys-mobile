import useAxios from '@/hooks/use-axios'

// interface Response {
// 	name: string
// 	date_of_birth: string
// 	cpf: string
// 	registration_code: string
// 	phone: string
// 	address: string
// 	city: string
// 	state: string
// 	postcode: string
// }

export const useGetProfile = () => {
	const { data, loading, error } = useAxios<any>({ url: 'users', method: 'get' }, { manual: false })
	const firstData = data?.data?.[0] ?? null

	return { data: firstData, loading, error }
}
