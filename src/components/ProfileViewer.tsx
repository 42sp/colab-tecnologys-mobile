import React from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setName, setAge } from '@/libs/redux/slices/profileSlice'
import type { RootState } from '@/libs/redux/store'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Feather } from '@expo/vector-icons'

const ProfileViewer = () => {
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
		<SafeAreaView className="w-full">
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

			<View className="mb-4 flex-row items-center">
				<View className="mr-2 w-[80%]">
					<Input placeholder="Digite novo nome" onChangeText={setNewName} />
				</View>

				<Button className="flex-1 rounded-full " onPress={() => handleUpdateName()}>
					<Feather name={'arrow-right'} size={30} color="#ffff" />
				</Button>
			</View>

			<View className="mb-4 flex-row items-center">
				<View className="mr-2 w-[80%]">
					<Input placeholder="Digite nova idade" onChangeText={setNewAge} />
				</View>

				<Button
					className="flex-1"
					onPress={() => handleUpdateAge()}
					variant="gradient"
					gradientColors={['#4F46E5', '#10B981']}
				>
					<Feather name={'arrow-right'} size={30} color="#ffff" />
				</Button>
			</View>
		</SafeAreaView>
	)
}

export default ProfileViewer
