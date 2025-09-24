import { getAuthSecureStore } from '@/libs/expo-secure-store/expo-secure-store'
import { Dispatch } from 'redux'
import { getProfile } from '@/api/get-profile'
import { setAuth } from '@/libs/redux/auth/auth-slice'
import { setProfile } from '@/libs/redux/user-profile/user-profile-slice'
import { setTasks } from '../redux/tasks/tasks-slice'
import { getTasks } from '@/api/get-tasks'

export async function loadAuthSecureStore(dispatch: Dispatch) {
	const data = await getAuthSecureStore([
		{ key: 'token' },
		{ key: 'expiryDate' },
		{ key: 'userid' },
	])

	const now = Math.floor(Date.now() / 1000)

	if (data[0].value && data[1].value && parseInt(data[1].value) >= now) {
		dispatch(setAuth({ token: data[0].value, expiry: data[1].value, id: data[2].value }))

		const profileResponse = await getProfile()
		// const profileResponse = await getProfileId(data[2].value)
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
				//roleId: userProfile.role_id,
			}),
		)
		const tasks = await getTasks()
		dispatch(setTasks(tasks))
	}
}
