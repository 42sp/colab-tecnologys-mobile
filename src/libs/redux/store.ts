import { configureStore } from '@reduxjs/toolkit'
import authSignInReducer from './auth-sign-in/auth-sign-in-slice'
import userSignInReducer from './user-sign-in/user-sign-in-slice'
import userProfileReducer from './user-profile/user-profile-slice'
import passwordRecoveryReducer from './password-recovery/password-recovery-slice'

const store = configureStore({
	reducer: {
		// redux toolkit tem um switch interno para os types
		authSignIn: authSignInReducer,
		userSignIn: userSignInReducer,
		userProfile: userProfileReducer,
		passwordRecovery: passwordRecoveryReducer,
	},
})

// tipo da store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
