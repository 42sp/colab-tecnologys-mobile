import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: profileDataState = {
	name: null,
	email: null,
	cpf: null,
	phone: null,
	jobTitle: null,
	password: null,
}

interface profileDataState {
	name: string | null
	email: string | null
	cpf: string | null
	phone: string | null
	jobTitle: string | null
	password: string | null
}

const profileDataSlice = createSlice({
	name: 'profile-data',
	initialState,
	reducers: {
		setName(state, action: { payload: profileDataState['name'] }) {
			state.name = action.payload
		},
		setEmail(state, action: { payload: profileDataState['email'] }) {
			state.email = action.payload
		},
		setCpf(state, action: { payload: profileDataState['cpf'] }) {
			state.cpf = action.payload
		},
		setPhone(state, action: { payload: profileDataState['phone'] }) {
			state.phone = action.payload
		},
		setJobTitle(state, action: { payload: profileDataState['jobTitle'] }) {
			state.jobTitle = action.payload
		},
		setPassword(state, action: { payload: profileDataState['password'] }) {
			state.password = action.payload
		},
	},
})

export const { setName, setEmail, setCpf, setPhone, setJobTitle, setPassword } =
	profileDataSlice.actions
export const selectName = (state: RootState) => state.profileData.name
export const selectEmail = (state: RootState) => state.profileData.email
export const selectCpf = (state: RootState) => state.profileData.cpf
export const selectPhone = (state: RootState) => state.profileData.phone
export const selectJobTitle = (state: RootState) => state.profileData.jobTitle
export const selectPassword = (state: RootState) => state.profileData.password
export default profileDataSlice.reducer
