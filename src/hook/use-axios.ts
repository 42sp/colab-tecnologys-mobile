import { useEffect, useState } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
import { env } from '@/libs/env'
import { useSelector } from 'react-redux'
import type { RootState } from '@/libs/redux/store'

interface configRequest {
	method: 'get' | 'post' // método que vai ser usado
	url: string // url ex.: '/users', '/service'
	configs?: AxiosRequestConfig // configurações do Axios => headers
}

interface options {
	manual?: boolean
}

export default function useAxios<T>(configRequest: configRequest, options: options = {}) {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const { method, url, configs = {} } = configRequest
	const { token } = useSelector((state: RootState) => state.authSignIn)

	// instância do axios
	const api = axios.create({
		baseURL: env.EXPO_PUBLIC_API_URL,
		withCredentials: true,
		timeout: 1000,
		...configs,
	})

	// Interceptor que depende do token
	useEffect(() => {
		const interceptor = api.interceptors.request.use((config) => {
			if (token) {
				config.headers['Authorization'] = `Bearer ${token}`
			}
			console.log('Headers enviados:', config.headers)
			return config
		})

		// cleanup para remover interceptor antigo
		return () => {
			api.interceptors.request.eject(interceptor)
		}
	}, [token]) // reexecuta sempre que o token mudar

	const fetchData = async (overrideConfig?: AxiosRequestConfig) => {
		setLoading(true)
		setError(null)
		try {
			const response = await api.request<T>({
				method,
				url,
				...configs,
				...overrideConfig,
			})
			setData(response.data)
			return response.data
		} catch (err) {
			if (err instanceof Error) {
				console.log(err.message)
				setError(err.message)
			}
		} finally {
			setLoading(false)
		}
	}

	// automatico quando renderiza a página com useEffect
	useEffect(() => {
		if (!options.manual) {
			fetchData()
		}
	}, [])
	// manual quando usado a partir de um evento
	return options.manual ? { data, loading, error, fetchData } : { data, loading, error }
}
