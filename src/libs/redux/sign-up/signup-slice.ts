import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// types
interface SignUptate {
	cpf: string
	name: string | null
	email: string | null
	roleId: string | null
	phone: string | null
	jobTitle?: string | null
}

// initial state
const initialState: SignUptate = {
	cpf: '',
	name: null,
	email: null,
	roleId: '',
	phone: null,
	jobTitle: null,
}

// creation of slice
const signUpSlice = createSlice({
	name: 'signUp',
	initialState,
	reducers: {
		setSignUp(state, { payload }: PayloadAction<SignUptate>) {
			return { ...state, ...payload }
		},
		resetSignUp() {
			return initialState
		},
	},
})

export default signUpSlice.reducer

export const { setSignUp, resetSignUp } = signUpSlice.actions
