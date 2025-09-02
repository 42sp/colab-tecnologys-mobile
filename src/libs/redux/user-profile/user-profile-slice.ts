import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: UserProfileState = {
	name: null,
	dateOfBirth: null,
	cpf: null,
	registrationCode: null,
	phone: null,
	address: null,
	city: null,
	region: null,
	postcode: null,
}

interface UserProfileState {
	name: string | null
	dateOfBirth: string | null
	cpf: string | null
	registrationCode: string | null
	phone: string | null
	address: string | null
	city: string | null
	region: string | null
	postcode: string | null
}

const userProfileSlice = createSlice({
	name: 'user-profile',
	initialState,
	reducers: {
		setName(state, action: { payload: UserProfileState['name'] }) {
			state.name = action.payload
		},
		setDateOfBirth(state, action: { payload: UserProfileState['dateOfBirth'] }) {
			state.dateOfBirth = action.payload
		},
		setCpf(state, action: { payload: UserProfileState['cpf'] }) {
			state.cpf = action.payload
		},
		setPhone(state, action: { payload: UserProfileState['phone'] }) {
			state.phone = action.payload
		},
		setAddress(state, action: { payload: UserProfileState['address'] }) {
			state.address = action.payload
		},
		setCity(state, action: { payload: UserProfileState['city'] }) {
			state.city = action.payload
		},
		setRegion(state, action: { payload: UserProfileState['region'] }) {
			state.region = action.payload
		},
		setPostcode(state, action: { payload: UserProfileState['postcode'] }) {
			state.postcode = action.payload
		},
	},
})

export const selectName = (state: RootState) => state.userProfile.name
export const selectDateOfBirth = (state: RootState) => state.userProfile.dateOfBirth
export const selectCpf = (state: RootState) => state.userProfile.cpf
export const selectPhone = (state: RootState) => state.userProfile.phone
export const selectAddress = (state: RootState) => state.userProfile.address
export const selectCity = (state: RootState) => state.userProfile.city
export const selectRegion = (state: RootState) => state.userProfile.region
export const selectPostcode = (state: RootState) => state.userProfile.postcode

export const {
	setName,
	setDateOfBirth,
	setCpf,
	setPhone,
	setAddress,
	setCity,
	setRegion,
	setPostcode,
} = userProfileSlice.actions
export default userProfileSlice.reducer
