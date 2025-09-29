import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Roles } from '@/api/get-roles'

// initial state
const initialState: Roles = {
	id: '',
	role_name: '',
	role_description: '',
	hierarchy_level: 0,
	is_active: false,
	updated_at: new Date().toString(),
	created_at: new Date().toString(),
}

// creation of slice
const rolesSlice = createSlice({
	name: 'roles',
	initialState,
	reducers: {
		setRoles: (state, action: PayloadAction<Roles>) => {
			Object.assign(state, action.payload)
		},
		resetRoles() {
			return initialState
		},
	},
})

export default rolesSlice.reducer
export const { setRoles, resetRoles } = rolesSlice.actions
