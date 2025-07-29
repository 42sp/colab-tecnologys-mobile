import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setName, setAge } from '@/libs/redux/slices/profileSlice'
import type { RootState } from '@/libs/redux/store'
import { Input } from './ui/input'
import { Button } from './ui/button'

const ProfileViewer = () => {
	// Acessa o estado do Redux (note a estrutura profile dentro do state)
	const { name, age } = useSelector((state: RootState) => state.profile)
	const dispatch = useDispatch()
	const [newName, setNewName] = React.useState('')
	const [newAge, setNewAge] = React.useState('')

	const handleUpdateName = () => {
		if (newName.trim()) {
			dispatch(setName(newName))
			setNewName('')
		}
	}

	const handleUpdateAge = () => {
		const ageNumber = parseInt(newAge, 10)
		if (!isNaN(ageNumber)) {
			dispatch(setAge(ageNumber))
			setNewAge('')
		}
	}

	return (
		<View>
			<Text className="self-center">Perfil Atual</Text>
			<View className="mb-4">
				<View className="flex-row gap-2">
					<Text>Nome:</Text>
					<Text>{name}</Text>
				</View>

				<View className="flex-row gap-2">
					<Text>Idade:</Text>
					<Text>{age}</Text>
				</View>
			</View>

			<View className="mb-2 flex-row items-center gap-2">
				<Input
					className="w-[70%]"
					placeholder="Digite novo nome"
					value={newName}
					onChangeText={setNewName}
					testID="nameInput"
				/>
				<Button
					className="w-16"
					onPress={handleUpdateName}
					disabled={!newName.trim()}
					testID="updateNameButton"
				/>
			</View>

			<View className="mb-2 flex-row items-center gap-2">
				<Input
					className="w-[70%]"
					placeholder="Digite nova idade"
					value={newAge}
					onChangeText={setNewAge}
					keyboardType="numeric"
					testID="ageInput"
				/>
				<Button
					className="w-16"
					onPress={handleUpdateAge}
					disabled={!newAge.trim()}
					testID="updateAgeButton"
				/>
			</View>
		</View>
	)
}

export default ProfileViewer
