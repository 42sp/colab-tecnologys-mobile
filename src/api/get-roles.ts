import useAxios from '@/hooks/use-axios'

interface Roles {
	id: string
	role_name: string
}

interface Response {
	data: Roles[]
}

export const useGetRoles = () => {
	const { data, loading, error } = useAxios<Response>({ url: 'roles', method: 'get' })

	const items =
		data?.data.map((roles) => ({
			id: roles.id,
			label: roles.role_name,
		})) || []
	return { items, loading, error }
}
