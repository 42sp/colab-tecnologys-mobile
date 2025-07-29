import { createSlice } from '@reduxjs/toolkit'
import { ProfileState, ProfileType } from '../types/profile' // Adjust the import path as necessary

const initialState: ProfileState = {
	name: '42 São Paulo',
	age: 25,
}

const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setName(state, action: { payload: ProfileState['name'] }) {
			state.name = action.payload
		},
		setAge(state, action: { payload: ProfileState['age'] }) {
			state.age = action.payload
		},
	},
} as ProfileType)

export const { setName, setAge } = profileSlice.actions
export default profileSlice.reducer
