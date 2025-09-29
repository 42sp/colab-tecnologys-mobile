// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import z from 'zod'

// const filterFormSchema = z.object({
// 	dateRange: z.object({
// 		start: z.date().optional(),
// 		end: z.date().optional(),
// 	}),
// 	quickDate: z.enum(['today', 'week', 'month']).optional(),
// 	status: z.array(z.enum(['pending', 'approved', 'completed'])).optional(),
// })

// type FilterFormType = z.infer<typeof filterFormSchema>

// export function HomeFilterForm() {
// 	const { control, handleSubmit, reset, watch, setValue } = useForm<FilterFormType>({
// 		resolver: zodResolver(filterFormSchema),
// 		defaultValues: {
// 			dateRange: { start: undefined, end: undefined },
// 			status: [],
// 		},
// 	})

// 	const selectedStatus = watch('status') || []
// 	const quickDate = watch('quickDate')

// 	const toggleStatus = (status: 'pending' | 'approved' | 'completed') => {
// 		const newStatus = selectedStatus.includes(status)
// 			? selectedStatus.filter((s) => s !== status)
// 			: [...selectedStatus, status]
// 		setValue('status', newStatus)
// 	}

// 	const handleQuickDate = (value: 'today' | 'week' | 'month') => {
// 		const now = new Date()
// 		let startDate: Date | undefined
// 		let endDate: Date | undefined

// 		if (quickDate === value) {
// 			// Se clicar no mesmo botão, desmarca
// 			setValue('quickDate', undefined)
// 			setValue('dateRange', { start: undefined, end: undefined })
// 			return
// 		}

// 		if (value === 'today') {
// 			startDate = new Date(now.setHours(0, 0, 0, 0))
// 			endDate = new Date(now.setHours(23, 59, 59, 999))
// 		} else if (value === 'week') {
// 			const day = now.getDay()
// 			const diff = now.getDate() - day + (day === 0 ? -6 : 1) // Ajuste para domingo sendo 0
// 			startDate = new Date(now.setDate(diff))
// 			startDate.setHours(0, 0, 0, 0)
// 			endDate = new Date(startDate)
// 			endDate.setDate(startDate.getDate() + 6)
// 			endDate.setHours(23, 59, 59, 999)
// 		} else if (value === 'month') {
// 			startDate = new Date(now.getFullYear(), now.getMonth(), 1)
// 			endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0)
// 			endDate.setHours(23, 59, 59, 999)
// 		}

// 		setValue('quickDate', value)
// 		setValue('dateRange', { start: startDate, end: endDate })
// 	}

// 	const onSubmit = (data: FilterFormType) => {
// 		console.log('Filters applied:', data)
// 		// Aqui você pode implementar a lógica para aplicar os filtros
// 	}
// }
