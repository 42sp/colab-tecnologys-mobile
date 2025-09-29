import axios from 'axios'
import store from '../redux/store'
import { API_URL } from '@env'
import { match, P } from 'ts-pattern'
import { logoutUser } from '@/utils'

export const api = axios.create({
	baseURL: API_URL,
	timeout: 5000,
})

// Log de criação do axios
console.log('[AXIOS] API_URL:', API_URL)

const getAuthHeader = () => {
	const token = store.getState().auth.token
	const accessToken = store.getState().passwordRecovery.accessToken
	return accessToken || token ? `Bearer ${accessToken || token}` : undefined
}

api.interceptors.request.use(
	(config) => {
		const authHeader = getAuthHeader()
		if (authHeader) {
			config.headers.Authorization = authHeader
		}
		console.log('[AXIOS][REQUEST]', {
			url: config.url,
			method: config.method,
			headers: config.headers,
			data: config.data,
		})
		return config
	},
	(error) => {
		console.log('[AXIOS][REQUEST][ERROR]:', error)
		return Promise.reject(error)
	},
)

api.interceptors.response.use(
	(response) => {
		console.log('[AXIOS][RESPONSE]', {
			url: response.config.url,
			status: response.status,
			data: response.data,
		})
		return response
	},
	(error) => {
		console.log('[AXIOS][RESPONSE][ERROR]:', error.response.data.message)
		if (error.response) {
			const info = error.response.data.message || error.response.data.error || error.message
			match({ info })
				.with({ info: P.when((c: any) => c.indexOf('duplicate key value') !== -1) }, (e) =>
					console.log('Erro de chave duplicada detectado:', e),
				)
				.with({ info: P.when((c: any) => c.indexOf('jwt expired') !== -1) }, (e) => {
					console.log('Erro de token expirado detectado:', e)
					logoutUser(store.dispatch)
				})
				.otherwise(() => false)
			//console.log('[AXIOS][RESPONSE][ERROR][DATA]:', error.response.data)
			console.log('[AXIOS][RESPONSE][ERROR][STATUS]:', error.response.status)
		}
		return Promise.reject(error)
	},
)
