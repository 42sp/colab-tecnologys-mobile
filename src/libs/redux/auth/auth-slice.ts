import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// types
export interface AuthState {
	token: string | null
	id: string | null
}

// initial state
const initialState: AuthState = {
	token: null,
	id: null,
}

// creation of slice
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<string>) => {
			state.token = action.payload
		},
		resetAuth() {
			return initialState
		},
	},
})

export default authSlice.reducer
export const { setAuth, resetAuth } = authSlice.actions
