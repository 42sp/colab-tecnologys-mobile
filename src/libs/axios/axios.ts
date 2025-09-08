import { env } from '@/libs/env'
import axios from 'axios'
import store from '../redux/store'

export const api = axios.create({
	baseURL: env.EXPO_PUBLIC_API_URL,
	timeout: 5000,
})

api.interceptors.request.use(
	(config) => {
		const token = store.getState().auth.token
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		console.log('Request error: ', error)
		return Promise.reject(error)
	}
)
