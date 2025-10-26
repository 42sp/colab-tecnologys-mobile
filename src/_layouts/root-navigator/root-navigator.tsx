import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import DrawerLayout from '../drawer/drawer'
import StackLayout from '../stack/stack'
import { LoadingModal } from '@/components/ui/loading-modal'
import { loadAuthSecureStore } from '@/libs/expo-secure-store/load-auth-secure-store'
import { logoutUser } from '@/utils'
import TabsLayout from '../tabs/tabs'
import { StatusBar } from 'react-native'
import { useNavigate } from '@/libs/react-navigation/useNavigate'

export default function RootNavigator() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { token } = useSelector((state: RootState) => state.auth)
	const [loading, setLoading] = useState<boolean>(true)
	const [authenticated, setAuthenticated] = useState<boolean>(false)
	useEffect(() => {
		if (authenticated) {
			navigate.stack('tab')
		}
	}, [loading, authenticated])

	useEffect(() => {
		async function loadAuth() {
			try {
				await loadAuthSecureStore(dispatch)
				setAuthenticated(true)
				console.log('LOG: Usuário autenticado a partir da expo-secure-store')
			} catch (error) {
				console.log('Error ao logar com securestore na Root. Erro retornado: ', error)
				logoutUser(dispatch)
			} finally {
				setLoading(false)
			}
		}
		loadAuth();
	}, [token])

	if (loading) {
		return <LoadingModal visible={loading} />
	}
	return (
		<>
			<StatusBar translucent barStyle="dark-content" backgroundColor="transparent" />
			<StackLayout />
		</>
	)
}
