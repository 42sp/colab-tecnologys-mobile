import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Task } from '@/api/get-tasks'

type SuggestionType = {
	title: string
	type: keyof Task
	value: string
}

type SearchProps = {
	onSearch: (task?: SuggestionType) => void
	tasksList: Task[]
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
			if (!normalizedQuery) return true
			return partial ? value.includes(normalizedQuery) : value === normalizedQuery
		})

		filtered = filtered.sort((a, b) =>
			(a[key]?.toString() ?? '').localeCompare(b[key]?.toString() ?? '', undefined, {
				numeric: true,
				sensitivity: 'base',
			}),
		)

		const unique = Array.from(
			new Map(filtered.map((item) => [item[key]?.toString().toLowerCase(), item])).values(),
		)

		return unique.map((item) => ({
			title: prefix ? `${prefix} ${item[key]}` : `${item[key]}`,
			type: key,
			value: item[key]?.toString() || '',
		}))
	}

	const handleSearchFilter = (query: string) => {
		setSearchTerm(query)
		const normalized = query.toLowerCase().trim()

		const fields: {
			key: keyof Task
			prefix?: string
			regex?: RegExp
		}[] = [
			{ key: 'service_tower', prefix: 'Torre', regex: /^(?:torre|tower)(?:\s+(.+))?/ },
			{
				key: 'service_apartment',
				prefix: 'Apartamento',
				regex: /^(?:apartamento|apartment|ap)(?:\s+(.+))?/,
			},
			{ key: 'service_floor', regex: /^(?:pavimento|pav)(?:\s+(.+))?/ },
			{ key: 'worker_name' },
			{ key: 'construction_name', prefix: 'Obra' },
			{ key: 'service_stage', prefix: 'Etapa/Parede' },
		]

		const suggestions = fields.flatMap((field) => {
			const match = field.regex?.exec(normalized)
			const queryValue = match ? match[1] : normalized
			return filterAndMapTasks(tasksList, field.key, field.prefix, queryValue)
		})

		setFilteredSuggestions(suggestions)
	}

	const handleSelect = ({ title, type, value }: SuggestionType) => {
		setSearchTerm(title)
		setFilteredSuggestions([])
		onSearch({ title, type, value })
	}

	const handleClear = () => {
		setSearchTerm('')
		setFilteredSuggestions([])
		onSearch()
	}

	return (
		<View className="flex-1">
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
