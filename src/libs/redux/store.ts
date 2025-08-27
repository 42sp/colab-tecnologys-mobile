import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './slices/profileSlice' // Adjust the import path as necessary
import authSignInReducer from './auth-sign-in/auth-sign-in-slice'
import profileDataReducer from './profile-data/profile-data-slice'

const store = configureStore({
	reducer: {
		// redux toolkit tem um switch interno para os types
		profile: profileReducer, // Assuming profileReducer is defined elsewhere
		authSignIn: authSignInReducer,
		profileData: profileDataReducer,
	},
})

// tipo da store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
