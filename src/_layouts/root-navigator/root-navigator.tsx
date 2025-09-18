import { RootState } from '@/libs/redux/store'
import { useSelector } from 'react-redux'
import DrawerLayout from '../drawer/drawer'
import StackLayout from '../stack/stack'

export default function RootNavigator() {
	const { token, expiry } = useSelector((state: RootState) => state.auth)
	const now = Math.floor(Date.now() / 1000)
	const isAuthenticated = !!token && !!expiry && parseInt(expiry) >= now

	return isAuthenticated ? <DrawerLayout /> : <StackLayout />
}
