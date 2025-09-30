import { AppDispatch } from '@/libs/redux/store'
import { resetAuth } from '@/libs/redux/auth/auth-slice'
import { clearProfile } from '@/libs/redux/user-profile/user-profile-slice'
import { clearTasks } from '@/libs/redux/tasks/tasks-slice'
import { deleteAuthSecureStore } from '@/libs/expo-secure-store/expo-secure-store'

export const logoutUser = async (dispatch: AppDispatch) => {
	dispatch(resetAuth())
	dispatch(clearProfile())
	dispatch(clearTasks())
	await deleteAuthSecureStore([{ key: 'token' }, { key: 'expiryDate' }, { key: 'userid' }])
}


export const getCurrentDate = () => {
	const now = new Date();
	return now.toLocaleString('sv-SE', { timeZone: 'America/Sao_Paulo' }) as unknown as Date
}
	
