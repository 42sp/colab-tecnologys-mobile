import { Text, View } from 'react-native'

import { EditScreenInfo } from './EditScreenInfo'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setAge } from 'redux/slices/profileSlice'
import { ProfileState } from 'redux/types/profile'

type ScreenContentProps = {
	title: string
	path: string
	children?: React.ReactNode
}

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
	const dispatch = useDispatch()
	const profile = useSelector((state: { profile: ProfileState }) => state.profile) // Accessing profile state, assuming it's defined in the store
	console.log('Profile:', profile) // Debugging line to check profile state

	useEffect(() => {
		// Example of using the profile state
		dispatch(setAge(30)) // Dispatching an action to set age, adjust as needed
	}, [])

	return (
		<View className={styles.container}>
			<Text className={styles.title}>{title}</Text>
			<View className={styles.separator} />
			<EditScreenInfo path={path} />
			{children}
		</View>
	)
}
const styles = {
	container: `items-center flex-1 justify-center`,
	separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
	title: `text-xl font-bold`,
}
