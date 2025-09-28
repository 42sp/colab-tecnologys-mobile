import { api } from '@/libs/axios/axios'

interface PasswordRecoveryProps {
	cpf?: string | null,
	phone?: string | null
}
interface passwordRecoveryResponse {
	accessToken?: string
	code?: string
	expiration?: string
	userId?: string
	phone?: string
	exp?: string
	sub?: string
}

export async function passwordRecovery({ cpf, phone }: PasswordRecoveryProps) {
	const response = await api.post<passwordRecoveryResponse>('/password-recovery', { cpf, phone })
	return response.data
}
