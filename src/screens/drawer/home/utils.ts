import { Task } from '@/api/get-tasks'
import { FilterType } from './home'

export function handleFilterChange(filter: FilterType, tasks: Task[]) {
	const yesterday = shiftDate(-1)
	const today = new Date()

	if (isEmptyFilter(filter, tasks)) {
		return buildResult(tasks, { today, yesterday })
	}

	const filteredData = applyFilters(tasks, filter!)

	return buildResult(filteredData)
}

function buildResult(tasks: Task[], dates?: { today: Date; yesterday: Date }) {
	const completedCount = tasks.filter(({ status }) => status === 'completed').length
	const pendingCount = tasks.filter(({ status }) => status === 'pending').length

	const base = {
		amount: tasks.length,
		percent: tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0,
		pendding: pendingCount,
	}

	if (!dates) {
		return {
			...base,
			data: [{ title: 'Filtered Results', data: tasks }],
		}
	}

	const { today, yesterday } = dates
	return {
		...base,
		data: [
			{
				title: 'Hoje',
				data: tasks.filter(({ created_at }) => isSameDay(new Date(created_at as string), today)),
			},
			{
				title: 'Ontem',
				data: tasks.filter(({ created_at }) =>
					isSameDay(new Date(created_at as string), yesterday),
				),
			},
			{
				title: 'Anteriores',
				data: tasks.filter(({ created_at }) => new Date(created_at as string) < yesterday),
			},
		],
	}
}

function shiftDate(days: number): Date {
	const date = new Date()
	date.setDate(date.getDate() + days)
	return date
}

function isSameDay(date1: Date, date2: Date): boolean {
	return date1.toLocaleDateString() === date2.toLocaleDateString()
}

function isEmptyFilter(filter: FilterType | undefined, tasks: Task[]): boolean {
	if (!filter) return true
	const noStatus = !filter.status || filter.status.length === 0
	const noDate = !filter.dateRange?.start
	const isAllTypes = filter.serviceType === 'Todos'
	return tasks.length === 0 || (noStatus && noDate && isAllTypes)
}

function applyFilters(tasks: Task[], filter: FilterType): Task[] {
	return tasks
		.filter(({ status }) => !filter.status?.length || filter.status.includes(status!))
		.filter(
			({ created_at }) =>
				!filter.dateRange?.start ||
				!filter.dateRange?.end ||
				(new Date(created_at as string)! >= filter.dateRange.start &&
					new Date(created_at as string)! <= filter.dateRange.end),
		)
		.filter(
			({ service_type }) =>
				!filter.serviceType ||
				filter.serviceType === 'Todos' ||
				service_type === filter.serviceType,
		)
}
