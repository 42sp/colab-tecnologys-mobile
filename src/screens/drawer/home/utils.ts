import { Task } from '@/api/get-tasks'
import { FilterType } from './home'

export function toDate(dateString?: string | Date) {
	return new Date(dateString as string)
}

export function toStringDate(date?: string | Date) {
	return new Date(date as string | Date).toLocaleDateString('pt-BR', {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		timeZone: 'UTC',
	})
}

export function handleFilterChange(filter: FilterType, tasks: Task[]) {
	const yesterday = shiftDate(-1)
	const today = new Date()

	if (isEmptyFilter(filter, tasks)) {
		return buildResult(tasks, { today, yesterday })
	}

	const filteredData = applyFilters(tasks, filter!)

	return buildResult(filteredData)
}

interface buildResultLogicProps {
	base: {
		amount: number
		percent: number
		pendding: number
	}
	tasks: Task[]
	dates?: { today: Date; yesterday: Date }
}

function buildResultLogic({ base, tasks, dates }: buildResultLogicProps) {
	if (!dates) {
		return {
			...base,
			data: [{ title: 'Filtered Results', data: tasks }],
		}
	}
	const dataDates = tasks
		.map(({ completion_date }) => toDate(completion_date))
		.sort((a, b) => b.getTime() - a.getTime())
		.map(toStringDate)
	const uniqueDates = Array.from(new Set(dataDates))
	const data = uniqueDates.reduce((acc: { title: string; data: Task[] }[], date: string) => {
		const today = new Date()
		const yesterday = shiftDate(-1)
		const displayDate =
			date == toStringDate(today)
				? `Hoje (${date})`
				: date == toStringDate(yesterday)
					? `Ontem (${date})`
					: date
		acc.push({
			title: displayDate,
			data: tasks
				.filter(({ completion_date }) => toStringDate(completion_date) === date)
				.sort((a, b) => toDate(b.completion_date).getTime() - toDate(a.completion_date).getTime()),
		})
		return acc
	}, [])

	return {
		...base,
		data,
	}
}

function buildResult(tasks: Task[], dates?: { today: Date; yesterday: Date }) {
	const completedCount = tasks.filter(({ status }) => status === 'completed').length
	const pendingCount = tasks.filter(({ status }) => status === 'pending').length

	const base = {
		amount: tasks.length,
		percent: tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0,
		pendding: pendingCount,
	}

	return buildResultLogic({ base, tasks, dates })
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
			({ completion_date }) =>
				!filter.dateRange?.start ||
				!filter.dateRange?.end ||
				(new Date(completion_date!.toISOString())! >= filter.dateRange.start &&
					new Date(completion_date!.toISOString())! <= filter.dateRange.end),
		)
		.filter(
			({ service_type }) =>
				!filter.serviceType ||
				filter.serviceType === 'Todos' ||
				service_type === filter.serviceType,
		)
}
