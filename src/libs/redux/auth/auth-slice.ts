import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// types
interface AuthState {
	token: string | null
	expiry: string | null
	id: string | null
}

// initial state
const initialState: AuthState = {
	token: null,
	expiry: null,
	id: null,
}

// creation of slice
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth(state, { payload }: PayloadAction<AuthState>) {
			return { ...state, ...payload }
		},
		resetAuth() {
			return initialState
		},
	},
})

export default authSlice.reducer

export const selectToken = (state: RootState) => state.auth.token
export const selectExpiry = (state: RootState) => state.auth.expiry
export const selectId = (state: RootState) => state.auth.id
export const { setAuth, resetAuth } = authSlice.actions
