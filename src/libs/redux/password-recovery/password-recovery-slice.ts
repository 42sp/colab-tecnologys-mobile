import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PasswordRecoveryState {
	cpf?: string
	phone?: string
	userId?: string
}

const initialState: PasswordRecoveryState = {}

const PasswordRecoverySlice = createSlice({
	name: 'password-recovery',
	initialState,
	reducers: {
		setPasswordRecovery(state, action: PayloadAction<PasswordRecoveryState>) {
			return { ...action.payload }
		},
		updatePasswordRecovery(state, action: PayloadAction<PasswordRecoveryState>) {
			return { ...state, ...action.payload }
		},
		clearPasswordRecovery() {
			return initialState
		},
		removePasswordRecoveryField(state, action: PayloadAction<keyof PasswordRecoveryState>) {
			const { [action.payload]: _, ...rest } = state
			return rest
		},
	},
})

export const {
	setPasswordRecovery,
	updatePasswordRecovery,
	clearPasswordRecovery,
	removePasswordRecoveryField,
} = PasswordRecoverySlice.actions

export default PasswordRecoverySlice.reducer
