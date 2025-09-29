import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import DrawerLayout from '../drawer/drawer'
import StackLayout from '../stack/stack'
import { LoadingModal } from '@/components/ui/loading-modal'
import { loadAuthSecureStore } from '@/libs/expo-secure-store/load-auth-secure-store'

export default function RootNavigator() {
	const dispatch = useDispatch()
	const { token } = useSelector((state: RootState) => state.auth)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		async function loadAuth() {
			try {
				await loadAuthSecureStore(dispatch)
				console.log('LOG: Usuário autenticado a partir da expo-secure-store')
			} catch (error) {
				console.log('Error ao logar com securestore na Root. Erro retornado: ', error)
			} finally {
				setLoading(false)
			}
		}
		loadAuth()
	}, [])

	if (loading) {
		return <LoadingModal visible={loading} />
	}
	return token ? <DrawerLayout /> : <StackLayout />
}
