import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: AuthSignInState = {
	token: null,
	expiry: null,
	id: null,
}

interface AuthSignInState {
	token: string | null
	expiry: string | null
	id: string | null
}

const authSignInSlice = createSlice({
	name: 'auth-sign-in',
	initialState,
	reducers: {
		setToken(state, action: { payload: AuthSignInState['token'] }) {
			state.token = action.payload
		},
		setExpiry(state, action: { payload: AuthSignInState['expiry'] }) {
			state.expiry = action.payload
		},
		setId(state, action: { payload: AuthSignInState['id'] }) {
			state.id = action.payload
		},
	},
})

export const { setToken, setExpiry, setId } = authSignInSlice.actions
export const selectToken = (state: RootState) => state.authSignIn.token
export const selectExpiry = (state: RootState) => state.authSignIn.token
export const selectId = (state: RootState) => state.authSignIn.token
export default authSignInSlice.reducer
