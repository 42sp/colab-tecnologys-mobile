import { api } from '@/libs/axios/axios'

interface EditProfileProps {
	name?: string
	email?: string
	phone?: string
	date_of_birth?: string
	address?: string
	profileId: string
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
	const { profileId, ...payload } = props
	if (!profileId) throw new Error('profileId não pode ser vazio')
	const updated = await api.patch<ProfileResponse>(`/profile/${profileId}`, payload)
	return updated.data
}
