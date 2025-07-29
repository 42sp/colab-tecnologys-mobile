import { configureStore } from '@reduxjs/toolkit'
import profileReducer from './slices/profileSlice' // Adjust the import path as necessary

const store = configureStore({
	reducer: {
		profile: profileReducer, // Assuming profileReducer is defined elsewhere
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
