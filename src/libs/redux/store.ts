import { configureStore } from '@reduxjs/toolkit'
import authSignInReducer from './auth-sign-in/auth-sign-in-slice'
import userReducer from './user/user-slice'
import userProfileReducer from './user-profile/user-profile-slice'

const store = configureStore({
	reducer: {
		// redux toolkit tem um switch interno para os types
		authSignIn: authSignInReducer,
		user: userReducer,
		userProfile: userProfileReducer,
	},
})

// tipo da store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
