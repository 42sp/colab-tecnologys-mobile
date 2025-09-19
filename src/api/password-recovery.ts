import { api } from '@/libs/axios/axios'

interface PasswordRecoveryProps {
	cpf?: string
	code?: string
}

interface passwordRecoveryResponse {
	accessToken?: string
	code?: string
	userId?: string
	phone?: string
	exp?: string
	sub?: string
}

export async function passwordRecovery({ cpf, code }: PasswordRecoveryProps) {
	const response = await api.post<passwordRecoveryResponse>('/password-recovery', { cpf, code })
	return response.data
}
