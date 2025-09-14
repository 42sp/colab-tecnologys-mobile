import { ActivityService } from '@/mock'
import { FilterType } from './home'

export function handleFilterChange(filter: FilterType | undefined, dataList: ActivityService[]) {
	const yesterday = new Date()
	yesterday.setDate(yesterday.getDate() - 1)

	const today = new Date()

	const isEmptyFilter =
		!filter ||
		(filter.status?.length === 0 && !filter.dateRange?.start && filter.serviceType === 'Todos')

	if (isEmptyFilter) {
		const completedCount = dataList.filter(({ status }) => status === 'completed').length
		const pendingCount = dataList.filter(({ status }) => status === 'pending').length

		return {
			amount: dataList.length,
			percent: Math.round((completedCount / dataList.length) * 100),
			pendding: pendingCount,
			data: [
				{
					title: 'Hoje',
					data: dataList.filter(({ time }) => isSameDay(time, today)),
				},
				{
					title: 'Ontem',
					data: dataList.filter(({ time }) => isSameDay(time, yesterday)),
				},
				{
					title: 'Anteriores',
					data: dataList.filter(({ time }) => time < yesterday),
				},
			],
		}
	}

	let filteredData = dataList

	if (filter.status?.length) {
		filteredData = filteredData.filter(({ status }) => filter.status?.includes(status!))
	}

	if (filter.dateRange?.start && filter.dateRange?.end) {
		filteredData = filteredData.filter(
			({ time }) => time >= filter.dateRange!.start! && time <= filter.dateRange!.end!,
		)
	}

	if (filter.serviceType && filter.serviceType !== 'Todos') {
		filteredData = filteredData.filter(({ serviceType }) => serviceType === filter.serviceType)
	}

	const completedCount = filteredData.filter(({ status }) => status === 'completed').length

	return {
		amount: filteredData.length,
		percent: filteredData.length ? Math.round((completedCount / filteredData.length) * 100) : 0,
		pendding: filteredData.filter(({ status }) => status === 'pending').length,
		data: [
			{
				title: 'Filtered Results',
				data: filteredData,
			},
		],
	}
}

function isSameDay(date1: Date, date2: Date): boolean {
	return date1.toLocaleDateString() === date2.toLocaleDateString()
}
