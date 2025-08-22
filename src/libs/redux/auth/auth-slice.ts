import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: AuthState = {
	token: null,
}

interface AuthState {
	token: string | null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken(state, action: { payload: AuthState['token'] }) {
			state.token = action.payload
		},
	},
})

export const { setToken } = authSlice.actions
export const selectToken = (state: RootState) => state.auth.token
export default authSlice.reducer
