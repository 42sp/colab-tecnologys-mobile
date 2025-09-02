import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// types
interface AuthSignInState {
	token: string | null
	expiry: string | null
	id: string | null
}

// initial state
const initialState: AuthSignInState = {
	token: null,
	expiry: null,
	id: null,
}

// creation of slice
const authSignInSlice = createSlice({
	name: 'auth-sign-in',
	initialState,
	reducers: {
		setAuth(state, action: PayloadAction<AuthSignInState>) {
			state.token = action.payload.token
			state.expiry = action.payload.expiry
			state.id = action.payload.id
		},
	},
})

// selectors
export const selectToken = (state: RootState) => state.authSignIn.token
export const selectExpiry = (state: RootState) => state.authSignIn.expiry
export const selectId = (state: RootState) => state.authSignIn.id
export const { setAuth } = authSignInSlice.actions
export default authSignInSlice.reducer
