import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// types
interface UserSignInState {
	id: string | null
	roleId: string | null
	profileId: string | null
	isActive: boolean | null
	isAvailable: boolean | null
}

// initial state
const initialState: UserSignInState = {
	id: null,
	roleId: null,
	profileId: null,
	isActive: false,
	isAvailable: false,
}

// creation of slice
const userSignInSlice = createSlice({
	name: 'user-sign-in',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserSignInState>) {
			state.id = action.payload.id
			state.isActive = action.payload.isActive
			state.isAvailable = action.payload.isAvailable
			state.roleId = action.payload.roleId
			state.profileId = action.payload.profileId
		},
		updateUser(state, action: PayloadAction<UserSignInState>) {
			if (state.id !== null) state.id = action.payload.id
			if (state.isActive !== null) state.isActive = action.payload.isActive
			if (state.isAvailable !== null) state.isAvailable = action.payload.isAvailable
			if (state.roleId !== null) state.roleId = action.payload.roleId
			if (state.profileId !== null) state.profileId = action.payload.profileId
		},
	},
})

// selectors
export const selectId = (state: RootState) => state.userSignIn.id
export const selectIsActive = (state: RootState) => state.userSignIn.isActive
export const selectIsAvailable = (state: RootState) => state.userSignIn.isAvailable
export const selectroleId = (state: RootState) => state.userSignIn.roleId
export const selectprofileId = (state: RootState) => state.userSignIn.profileId

export const { setUser, updateUser } = userSignInSlice.actions
export default userSignInSlice.reducer
