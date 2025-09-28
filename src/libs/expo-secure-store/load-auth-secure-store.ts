import { getAuthSecureStore } from '@/libs/expo-secure-store/expo-secure-store'
import { Dispatch } from 'redux'
import { getProfile } from '@/api/get-profile'
import { setAuth } from '@/libs/redux/auth/auth-slice'
import { setProfile } from '@/libs/redux/user-profile/user-profile-slice'
import { getTasks } from '@/api/get-tasks'
import { setTasks } from '../redux/tasks/tasks-slice'

export async function loadAuthSecureStore(dispatch: Dispatch) {
	const data = await getAuthSecureStore([
		{ key: 'token' },
		{ key: 'profile_id' },
		{ key: 'userid' },
	])

	dispatch(setAuth(data[0].value))

	const profileResponse = await getProfile({ userId: data[2].value })
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
			roleId: userProfile.role_id || undefined,
			userId: userProfile.user_id,
		}),
	)
	const tasks = await getTasks()
	dispatch(setTasks(tasks))
}
