import useAxios from '@/hooks/use-axios'

interface Profile {
	id: string
	user_id: string
	name: string
	email: string
	date_of_birth: string
	registration_code: string
	phone: string
	photo: string | null
	address: string
	city: string
	state: string
	postcode: string
	created_at: string
	updated_at: string
}

type Paginated<T> = { data: T[] }

export const useGetProfile = () => {
	const res = useAxios<Paginated<Profile>>({ url: 'profile', method: 'get' }, { manual: true })

	const profile: Profile | null = res.data?.data?.[0] ?? null
	const getProfile = res.fetchData!

	return { profile, loading: res.loading, error: res.error, getProfile }
}
