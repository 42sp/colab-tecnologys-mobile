import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/auth-slice'
import userReducer from './user/user-slice'
import userProfileReducer from './user-profile/user-profile-slice'
import passwordRecoveryReducer from './password-recovery/password-recovery-slice'

const store = configureStore({
	reducer: {
		// redux toolkit tem um switch interno para os types
		auth: authReducer,
		user: userReducer,
		userProfile: userProfileReducer,
		passwordRecovery: passwordRecoveryReducer,
	},
})

// tipo da store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
