import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: AuthState = {
	token: null,
}

interface AuthState {
	token: string | null
}

// interface AuthType {
// 	token: string
// 	initialState: AuthState
// 	reducers: {
// 		setToken: (state: AuthState, action: { payload: AuthState['token'] }) => void
// 	}
// }

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken(state, action: { payload: AuthState['token'] }) {
			state.token = action.payload
		},
	},
})
// } as AuthType)

export const { setToken } = authSlice.actions
export const selectToken = (state: RootState) => state.auth.token
export default authSlice.reducer
