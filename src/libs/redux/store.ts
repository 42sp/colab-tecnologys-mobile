import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth-slice'
import userProfileReducer from './user-profile/user-profile-slice'
import passwordRecoveryReducer from './password-recovery/password-recovery-slice'
import tasksReducer from '@/libs/redux/tasks/tasks-slice'

const store = configureStore({
	reducer: {
		auth: authReducer,
		userProfile: userProfileReducer,
		passwordRecovery: passwordRecoveryReducer,
		tasks: tasksReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
