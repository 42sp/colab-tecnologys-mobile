import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface UserProfileState {
	name?: string
	dateOfBirth?: Date
	email?: string
	photo?: string
	registrationCode?: string
	phone?: string
	address?: string
	city?: string
	state?: string
	postcode?: string
	updatedAt?: Date
	roleId?: string
	userId?: string
}

const initialState: UserProfileState = {}

const userProfileSlice = createSlice({
	name: 'user-profile',
	initialState,
	reducers: {
		setProfile(state, { payload }: PayloadAction<UserProfileState>) {
			return { ...state, ...payload }
		},
		updateProfile(state, { payload }: PayloadAction<Partial<UserProfileState>>) {
			return { ...state, ...payload }
		},
		selectU(state, { payload }: PayloadAction<UserProfileState>) {
			return { ...state, ...payload }
		},
		clearProfile: () => initialState,
	},
})

export const { setProfile, updateProfile, clearProfile } = userProfileSlice.actions
export default userProfileSlice.reducer
