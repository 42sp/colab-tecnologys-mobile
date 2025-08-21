import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './slices/profileSlice' // Adjust the import path as necessary
import authReducer from './auth/auth-slice'

const store = configureStore({
	reducer: {
		// redux toolkit tem um switch interno para os types
		profile: profileReducer, // Assuming profileReducer is defined elsewhere
		auth: authReducer,
	},
})

// tipo da store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
