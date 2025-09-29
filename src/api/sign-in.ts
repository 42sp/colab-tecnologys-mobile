import { api } from '@/libs/axios/axios'

interface SignInProps {
	cpf: string
	password: string
	strategy?: string
}

export interface AuthPayload {
	iat: string
	exp: string
	aud: string
	sub: string
	jti: string
}

export interface Authentication {
	strategy: string
	payload: AuthPayload
}

export interface User {
	id: string
	cpf: string
	role_id: string | null
	profile_id: string
	is_active: boolean
	is_available: boolean
	created_at: string
	updated_at: string
}

export interface SignInResponse {
	accessToken: string
	authentication: Authentication
	user: User
}

export async function signIn({ cpf, password, strategy = 'local' }: SignInProps) {
	const response = await api.post<SignInResponse>('/authentication', { cpf, password, strategy })
	return response.data
}
