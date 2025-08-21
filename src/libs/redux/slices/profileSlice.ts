import { createSlice } from '@reduxjs/toolkit'
import { ProfileState, ProfileType } from '../types/profile' // Adjust the import path as necessary
import { RootState } from '../store'

const initialState: ProfileState = {
	name: '42 São Paulo',
	age: 25,
}
// slice
const profileSlice = createSlice({
	name: 'profile',
	initialState, // estado inicial
	reducers: {
		// redux toolkit tem um switch interno para os types
		// reducer que muda o estado do name = setName = mudar o nome
		setName(state, action: { payload: ProfileState['name'] }) {
			state.name = action.payload // muda o nome
		},
		// reducer que muda o estado da age = setAge = mudara a idade
		setAge(state, action: { payload: ProfileState['age'] }) {
			state.age = action.payload // muda a idade
		},
	},
} as ProfileType)

// reducers setName e setAge são exportados como actionsCreators
export const { setName, setAge } = profileSlice.actions

// selectors definidos fora do slice para serem acessados globalmente
export const selectName = (state: RootState) => state.profile.name
export const selectAge = (state: RootState) => state.profile.age

export default profileSlice.reducer
