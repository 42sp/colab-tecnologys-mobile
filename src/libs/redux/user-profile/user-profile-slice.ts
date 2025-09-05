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
	},
})

export const selectName = (state: RootState) => state.userProfile.name
export const selectDateOfBirth = (state: RootState) => state.userProfile.dateOfBirth
export const selectEmail = (state: RootState) => state.userProfile.email
export const selectPhoto = (state: RootState) => state.userProfile.photo
export const selectRegistrationCode = (state: RootState) => state.userProfile.registrationCode
export const selectPhone = (state: RootState) => state.userProfile.phone
export const selectAddress = (state: RootState) => state.userProfile.address
export const selectCity = (state: RootState) => state.userProfile.city
export const selectRegion = (state: RootState) => state.userProfile.state
export const selectPostcode = (state: RootState) => state.userProfile.postcode
export const selectUpdatedAt = (state: RootState) => state.userProfile.updatedAt

export const { setProfile, updateProfile } = userProfileSlice.actions
export default userProfileSlice.reducer
