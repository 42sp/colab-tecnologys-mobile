import { env } from '@/libs/env'
import axios from 'axios'

export const api = axios.create({
	baseURL: env.EXPO_PUBLIC_API_URL,
	withCredentials: true,
	timeout: 1000,
})
