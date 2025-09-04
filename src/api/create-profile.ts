import { api } from '@/libs/axios/axios'

interface CreateProfileProps {
	name: string
	email: string | null
	date_of_birth: string
	cpf: string
	phone: string
	role_id: string
	user_id: string
}

export async function CreateProfile({}: CreateProfileProps) {
	return api.post('profile', {})
}
