import { api } from '@/libs/axios/axios'

interface EditProfileProps {
	name: string
	email?: string
	phone: string
	date_of_birth?: string
	address?: string
}

interface Profile {
	id: string
	user_id: string
	name: string
	email: string
	date_of_birth: Date
	registration_code: string
	phone: string
	photo: string
	address: string
	city: string
	state: string
	postcode: string
	created_at: Date
	updated_at: Date
}

interface ProfileResponse {
	total: number
	limit: number
	skip: number
	data: Profile[]
}

export async function EditProfile(props: EditProfileProps) {
	const list = await api.get<ProfileResponse>('/profile')
	const current = list.data.data?.[0]
	if (!current?.id) {
		throw new Error('Perfil não encontrado para o usuário atual')
	}
	const payload = Object.fromEntries(
		Object.entries(props).filter(([, v]) => v !== undefined && v !== null),
	) as Partial<EditProfileProps>

	const updated = await api.patch<Profile>(`/profile/${current.id}`, payload)
	return updated.data
}
