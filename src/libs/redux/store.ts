import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/libs/redux/auth/auth-slice'
import rolesReducer from '@/libs/redux/roles/roles-slice'
import userProfileReducer from '@/libs/redux/user-profile/user-profile-slice'
import passwordRecoveryReducer from '@/libs/redux/password-recovery/password-recovery-slice'
import tasksReducer from '@/libs/redux/tasks/tasks-slice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		userProfile: userProfileReducer,
		passwordRecovery: passwordRecoveryReducer,
		tasks: tasksReducer,
		roles: rolesReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
