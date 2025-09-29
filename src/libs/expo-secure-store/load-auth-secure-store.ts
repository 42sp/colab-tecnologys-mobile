import { getAuthSecureStore } from '@/libs/expo-secure-store/expo-secure-store'
import { Dispatch } from 'redux'
import { getProfile } from '@/api/get-profile'
import { setAuth } from '@/libs/redux/auth/auth-slice'
import { setProfile, updateState } from '@/libs/redux/user-profile/user-profile-slice'
import { getTasks } from '@/api/get-tasks'
import { setTasks } from '../redux/tasks/tasks-slice'
import { getRoles, Roles } from '@/api/get-roles'
import { setRoles } from '../redux/roles/roles-slice'

export async function loadAuthSecureStore(dispatch: Dispatch) {
	const data = await getAuthSecureStore([
		{ key: 'token' },
		{ key: 'profile_id' },
		{ key: 'userid' },
	])

	dispatch(setAuth(data[0].value))

	console.log('data do secure store no loadAuthSecureStore: ', data[1].value, data[2].value)

	const profileResponse = await getProfile({ userId: data[1].value })
	const userProfile = profileResponse.data[0]
	dispatch(
		updateState({
			name: userProfile.name,
			email: userProfile.email,
			dateOfBirth: userProfile.date_of_birth,
			registrationCode: userProfile.registration_code,
			phone: userProfile.phone,
			address: userProfile.address,
			city: userProfile.city,
			state: userProfile.state,
			postcode: userProfile.postcode,
			photo: userProfile.photo,
			updatedAt: userProfile.updated_at.toString(),
			roleId: userProfile.role_id || undefined,
			userId: userProfile.user_id,
			profileId: userProfile.id,
		}),
	)
	const role = (await getRoles({ id: userProfile.role_id })) as unknown as Roles
	dispatch(setRoles(role))
}
