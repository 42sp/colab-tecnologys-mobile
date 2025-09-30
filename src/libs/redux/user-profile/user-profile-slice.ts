import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface UserProfileState {
	name: null | string
	dateOfBirth?: Date
	email: null | string
	photo?: string
	registrationCode?: string
	phone: null | string
	address?: string
	city?: string
	state?: string
	postcode?: string
	updatedAt?: string
	roleId: null | string
	jobTitle: null | string
	userId?: string
	profileId?: string
}

const initialState: UserProfileState = {
	name: null,
	dateOfBirth: undefined,
	email: null,
	photo: '',
	registrationCode: '',
	phone: '',
	address: '',
	city: '',
	state: '',
	postcode: '',
	updatedAt: '',
	roleId: '',
	userId: '',
	jobTitle: '',
}

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
