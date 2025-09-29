import { api } from '@/libs/axios/axios'

interface PasswordRecoveryProps {
	cpf?: string | null
	phone?: string | null
}
interface passwordRecoveryResponse {
	accessToken?: string
	code: string
	expiration: string
	userId?: string
	phone?: string
	exp?: string
	sub?: string
}

export async function passwordRecovery(data: PasswordRecoveryProps) {
	const response = await api.post<passwordRecoveryResponse>('/password-recovery', data)
	console.log('response no password-recovery: ', response.data)
	return response.data
}
