import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import { Input } from '@/components/ui/input'
import { useSelector } from 'react-redux'
import { selectRoleId } from '@/libs/redux/user-profile/user-profile-slice'
import { getRoles } from '@/api/get-roles'
import { useEffect, useState } from 'react'

type SearchProps = {
	onSearch: (term: string) => void
	workers: string[]
}

export function Search({ onSearch, workers }: SearchProps) {
	const roleId = useSelector(selectRoleId)
	const [roleName, setRoleName] = useState<string>()
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])
	const [selected, setSelected] = useState(false)

	useEffect(() => {
		if (!roleId) return
		;async () => {
			try {
				const res = await getRoles({ id: roleId })
				setRoleName(res?.role_name)
			} catch (err) {
				console.error('Error when searching for role:', err)
			}
		}
	}, [roleId])

	const handleChange = (text: string) => {
		setSearchTerm(text)

		if (selected) setSelected(false)
		if (text.trim().length > 0) {
			const suggestions = workers.filter((w) => w.toLowerCase().includes(text.toLowerCase()))
			setFilteredSuggestions(suggestions)
		} else {
			setFilteredSuggestions([])
		}
	}

	const handleSelect = (name: string) => {
		setSearchTerm(name)
		setFilteredSuggestions([])
		onSearch(name)
		setSelected(true)
	}

	const handleClear = () => {
		setSearchTerm('')
		setFilteredSuggestions([])
		setSelected(false)
		onSearch('')
	}

	return (
		<View className="m-4">
			<Input
				keyboardType="default"
				IconLeft="search"
				IconRight={selected ? 'x' : undefined}
				iconPress={selected ? handleClear : undefined}
				placeholder="Nome do tarefeiro"
				value={searchTerm}
				onChangeText={handleChange}
				className="bg-white"
			/>

			{filteredSuggestions.length > 0 && (
				<FlatList
					data={filteredSuggestions}
					keyExtractor={(item) => item}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => handleSelect(item)}
							className="border-b border-gray-200 bg-gray-50 p-4"
						>
							<Text>{item}</Text>
						</TouchableOpacity>
					)}
				/>
			)}
		</View>
	)
}
