import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Task } from '@/api/get-tasks'

type SearchProps = {
	onSearch: (term: string) => void
	tasksList: Task[]
}

type SuggestionType = {
	title: string
	type: string
}

export function HomeSearch({ onSearch, tasksList }: SearchProps) {
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredSuggestions, setFilteredSuggestions] = useState<SuggestionType[]>([])

	function filterAndMapTasks(
		tasks: Task[],
		key: keyof Task,
		prefix?: string,
		query?: string,
		partial = true,
	): SuggestionType[] {
		const normalizedQuery = query?.toLowerCase().trim() || ''

		let filtered = tasks.filter((task) => {
			const value = task[key]?.toString().toLowerCase()
			if (!value) return false
			if (!normalizedQuery) return true // se query vazia, pega todos
			return partial ? value.includes(normalizedQuery) : value === normalizedQuery
		})

		filtered = filtered.sort((a, b) =>
			(a[key] ?? '').toString() > (b[key] ?? '').toString() ? 1 : -1,
		)

		const unique = Array.from(
			new Map(filtered.map((item) => [item[key]?.toString().toLowerCase(), item])).values(),
		)

		return unique.map((item) => ({
			title: prefix ? `${prefix} ${item[key]}` : (item[key] as string),
			type: key,
		}))
	}

	const handleSearchFilter = (query: string) => {
		setSearchTerm(query)
		const normalized = query.toLowerCase().trim()

		const uniqueSuggestions = (items: SuggestionType[]) => {
			return Array.from(new Map(items.map((item) => [item.title.toLowerCase(), item])).values())
		}

		const towerMatch = normalized.match(/(?:torre|tower)(?:\s+(.+))?/)
		if (towerMatch) {
			const filteredResult = tasksList.filter((task) =>
				towerMatch[1]
					? task.service_tower?.toLowerCase().includes(towerMatch[1])
					: !!task.service_tower,
			)
			console.log('towerMatch:', towerMatch, filteredResult)
			setFilteredSuggestions(
				uniqueSuggestions(
					filteredResult.map((item) => ({
						title: `Torre ${item.service_tower}`,
						type: 'tower',
					})),
				),
			)
			return
		}

		const apartmentMatch = normalized.match(/(?:apartamento|apartment|ap)(?:\s+(.+))?/)
		if (apartmentMatch) {
			console.log('apartmentMatch:', apartmentMatch)

			const filteredResult = tasksList
				.filter((task) =>
					apartmentMatch[1]
						? task.service_apartment?.toLowerCase().includes(apartmentMatch[1])
						: !!task.service_apartment,
				)
				.sort((a, b) => (a.service_apartment! > b.service_apartment! ? 1 : -1))
			setFilteredSuggestions(
				uniqueSuggestions(
					filteredResult.map((item) => ({
						title: `Apartamento ${item.service_apartment}`,
						type: 'apartment',
					})),
				),
			)
			return
		}

		const floorMatch = normalized.match(/(?:pavimento|pav)(?:\s+(.+))?/)
		if (floorMatch) {
			const filteredResult = tasksList.filter((task) =>
				floorMatch[1]
					? task.service_floor?.toLowerCase().includes(floorMatch[0])
					: !!task.service_floor,
			)
			setFilteredSuggestions(
				uniqueSuggestions(
					filteredResult.map((item) => ({
						title: item.service_floor as string,
						type: 'floor',
					})),
				),
			)
			return
		}

		const filteredResult = tasksList.filter(
			(task) =>
				task.worker_name?.toLowerCase().includes(normalized) ||
				task.construction_name?.toLowerCase().includes(normalized) ||
				task.service_floor?.toLowerCase() === normalized ||
				task.service_apartment?.toLowerCase() === normalized ||
				task.service_tower?.toLowerCase() === normalized ||
				task.service_stage?.toLowerCase() === normalized,
		)

		setFilteredSuggestions(
			uniqueSuggestions(
				filteredResult.map((item) => {
					if (item.worker_name?.toLowerCase().includes(normalized)) {
						return { title: item.worker_name, type: 'worker' }
					}
					if (item.construction_name?.toLowerCase() === normalized) {
						return { title: `Obra ${item.construction_name}`, type: 'construction' }
					}
					if (item.service_floor?.toLowerCase() === normalized) {
						return { title: `${item.service_floor}`, type: 'floor' }
					}
					if (item.service_apartment?.toLowerCase() === normalized) {
						return { title: `Apartamento ${item.service_apartment}`, type: 'apartment' }
					}
					if (item.service_tower?.toLowerCase() === normalized) {
						return { title: `Torre ${item.service_tower}`, type: 'tower' }
					}
					if (item.service_stage?.toLowerCase() === normalized) {
						return { title: `Etapa/parede ${item.service_stage}`, type: 'stage' }
					}
					return { title: '', type: '' }
				}),
			),
		)
	}

	useEffect(() => {
		console.log('Filtered Suggestions:', filteredSuggestions)
	}, [filteredSuggestions])

	const handleSelect = ({ title, type }: SuggestionType) => {
		console.log('Selected:', title, type)
		setSearchTerm(title)
		setFilteredSuggestions([])
		// onSearch(name)
	}

	const handleClear = () => {
		setSearchTerm('')
		setFilteredSuggestions([])
		// onSearch('')
	}

	return (
		<View>
			<Input
				keyboardType="default"
				IconLeft="search"
				placeholder="Pesquisar tarefa"
				value={searchTerm}
				onChangeText={(value) => (value ? handleSearchFilter(value) : handleClear())}
			/>

			{filteredSuggestions && (
				<FlatList
					className="max-h-60"
					showsHorizontalScrollIndicator={false}
					data={filteredSuggestions}
					keyExtractor={(item) => item.title}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => handleSelect(item)}
							className="border-b border-gray-200 bg-gray-50 p-4"
						>
							<Text>{item.title}</Text>
						</TouchableOpacity>
					)}
				/>
			)}
		</View>
	)
}
