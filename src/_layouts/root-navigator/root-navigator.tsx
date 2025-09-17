import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/libs/redux/store'
import { setAuth } from '@/libs/redux/auth/auth-slice'
import { setProfile } from '@/libs/redux/user-profile/user-profile-slice'
import DrawerLayout from '../drawer/drawer'
import StackLayout from '../stack/stack'
import { getProfile } from '@/api/get-profile'
import { getAuthSecureStore } from '@/libs/expo-secure-store/expo-secure-store'
import { LoadingModal } from '@/components/ui/loading-modal'

export default function RootNavigator() {
	const dispatch = useDispatch()
	const { token, expiry } = useSelector((state: RootState) => state.auth)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		async function loadAuth() {
			try {
				const data = await getAuthSecureStore([
					{ key: 'token' },
					{ key: 'expiryDate' },
					{ key: 'userid' },
				])
				const now = Math.floor(Date.now() / 1000)

				if (data[0].value && data[1].value && parseInt(data[1].value) >= now) {
					if (!token || !expiry || parseInt(expiry) < now) {
						dispatch(setAuth({ token: data[0].value, expiry: data[1].value, id: data[2].value }))
						const profileResponse = await getProfile()
						const userProfile = profileResponse.data[0]
						dispatch(
							setProfile({
								name: userProfile.name,
								dateOfBirth: userProfile.date_of_birth,
								registrationCode: userProfile.registration_code,
								phone: userProfile.phone,
								address: userProfile.address,
								city: userProfile.city,
								state: userProfile.state,
								postcode: userProfile.postcode,
								photo: userProfile.photo,
								updatedAt: userProfile.updated_at,
							}),
						)
					}
				}
			} catch (error) {
				console.log('Tentando logar a partir de secure store: ', error)
			} finally {
				setLoading(false)
			}
		}

		loadAuth()
	}, [dispatch, token, expiry])

	const now = Math.floor(Date.now() / 1000)
	const isAuthenticated = !!token && !!expiry && parseInt(expiry) >= now

	if (loading) {
		return <LoadingModal visible={loading} />
	}
	return isAuthenticated ? <DrawerLayout /> : <StackLayout />
}
