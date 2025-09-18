import { Task } from '@/api/get-tasks'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TasksState {
	tasks: Task[]
}

const initialState: TasksState = {
	tasks: [],
}

const TasksSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		setTasks(state, action: PayloadAction<Task[]>) {
			state.tasks = action.payload
		},

		addTask(state, action: PayloadAction<Task>) {
			state.tasks.push(action.payload)
		},

		updateTask(state, action: PayloadAction<{ id: string; updates: Partial<Task> }>) {
			const index = state.tasks.findIndex((task) => task.id === action.payload.id)
			if (index !== -1) {
				state.tasks[index] = { ...state.tasks[index], ...action.payload.updates }
			}
		},

		removeTask(state, action: PayloadAction<string>) {
			state.tasks = state.tasks.filter((task) => task.id !== action.payload)
		},

		clearTasks(state) {
			state.tasks = []
		},

		removeTaskFieldFromAll(state, action: PayloadAction<keyof Task>) {
			state.tasks = state.tasks.map((task) => {
				const { [action.payload]: _, ...rest } = task
				return rest
			})
		},

		removeTaskField(state, action: PayloadAction<{ id: string; field: keyof Task }>) {
			const index = state.tasks.findIndex((task) => task.id === action.payload.id)
			if (index !== -1) {
				const { [action.payload.field]: _, ...rest } = state.tasks[index]
				state.tasks[index] = rest
			}
		},
	},
})

export const {
	setTasks,
	addTask,
	updateTask,
	removeTask,
	clearTasks,
	removeTaskFieldFromAll,
	removeTaskField,
} = TasksSlice.actions

export default TasksSlice.reducer
