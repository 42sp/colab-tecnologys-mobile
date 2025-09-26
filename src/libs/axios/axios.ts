import axios from 'axios'
import store from '../redux/store'
import { API_URL } from '@env'

export const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
})

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
		return config
	},
	(error) => {
		console.log('Request error: ', error)
		return Promise.reject(error)
	},
)
