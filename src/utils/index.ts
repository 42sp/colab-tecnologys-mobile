import { AppDispatch } from '@/libs/redux/store'
import { resetAuth } from '@/libs/redux/auth/auth-slice'
import { clearProfile, updateState } from '@/libs/redux/user-profile/user-profile-slice'
import { clearTasks } from '@/libs/redux/tasks/tasks-slice'
import {
	deleteAuthSecureStore,
	saveAuthSecureStore,
} from '@/libs/expo-secure-store/expo-secure-store'
import { Dispatch } from '@reduxjs/toolkit'
import { setRoles } from '@/libs/redux/roles/roles-slice'

export const logoutUser = async (dispatch: AppDispatch) => {
	dispatch(resetAuth())
	dispatch(clearProfile())
	dispatch(clearTasks())
	await deleteAuthSecureStore([{ key: 'token' }, { key: 'expiryDate' }, { key: 'userid' }])
}

export const getCurrentDate = (date?: string) => {
	const now = new Date(date ? date : '')
	return now.toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }) as unknown as Date
}

export const setAuthProfile = async (auth: any, dispatch: Dispatch) => {
	const { accessToken } = auth
	const { id } = auth.user
	const { profile, role } = auth.meta
	console.log(profile)

	await saveAuthSecureStore([
		{ key: 'token', value: accessToken },
		{ key: 'profile_id', value: id },
		{ key: 'userid', value: id },
	])

	dispatch(
		updateState({
			name: profile.name,
			email: profile.email,
			dateOfBirth: profile.date_of_birth,
			registrationCode: profile.registration_code,
			phone: profile.phone,
			address: profile.address,
			city: profile.city,
			state: profile.state,
			postcode: profile.postcode,
			photo: profile.photo,
			roleId: profile.role_id || undefined,
			userId: id,
			profileId: id,
		}),
	)
	dispatch(setRoles(role))

	return true
}
