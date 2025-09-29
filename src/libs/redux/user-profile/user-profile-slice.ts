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
		setPhoto: (state, action: PayloadAction<string>) => {
			state.photo = action.payload
		},
		updateState: (state, action: PayloadAction<Partial<UserProfileState>>) => {
			Object.assign(state, action.payload)
		},
		clearProfile: () => initialState,
	},
})

export const { setProfile, updateProfile, clearProfile, updateState, setPhoto } =
	userProfileSlice.actions
export default userProfileSlice.reducer
