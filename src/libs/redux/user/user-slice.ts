import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// types
interface UserState {
	id?: string
	cpf?: string
	roleId?: string
	profileId?: string
	isActive?: boolean
	isAvailable?: boolean
	createdAt?: Date
	updatedAt?: Date
}

// initial state
const initialState: UserState = {}

// creation of slice
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserState>) {
			state.id = action.payload.id
			state.cpf = action.payload.id
			state.isActive = action.payload.isActive
			state.isAvailable = action.payload.isAvailable
			state.roleId = action.payload.roleId
			state.profileId = action.payload.profileId
			state.createdAt = action.payload.createdAt
			state.updatedAt = action.payload.updatedAt
		},
		updateUser(state, action: PayloadAction<UserState>) {
			if (state.id !== null) state.id = action.payload.id
			if (state.cpf !== null) state.cpf = action.payload.cpf
			if (state.isActive !== null) state.isActive = action.payload.isActive
			if (state.isAvailable !== null) state.isAvailable = action.payload.isAvailable
			if (state.roleId !== null) state.roleId = action.payload.roleId
			if (state.profileId !== null) state.profileId = action.payload.profileId
			if (state.createdAt !== null) state.createdAt = action.payload.createdAt
			if (state.updatedAt !== null) state.updatedAt = action.payload.updatedAt
		},
	},
})

// selectors
export const selectId = (state: RootState) => state.user.id
export const selectIsActive = (state: RootState) => state.user.isActive
export const selectIsAvailable = (state: RootState) => state.user.isAvailable
export const selectRoleId = (state: RootState) => state.user.roleId
export const selectProfileId = (state: RootState) => state.user.profileId
export const selectCreatedAt = (state: RootState) => state.user.createdAt
export const selectUpdatedAt = (state: RootState) => state.user.updatedAt

export const { setUser, updateUser } = userSlice.actions
export default userSlice.reducer
