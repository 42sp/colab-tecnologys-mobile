import { Feather } from '@expo/vector-icons'
import { Text, View } from 'react-native'
import { ProfileIcon } from './profile-icon'

type ProfileInfoItemProps = {
	label: string
	value: string
	icon: keyof typeof Feather.glyphMap
}

export function ProfileInfoItem({ label, value, icon }: ProfileInfoItemProps) {
	return (
		<View className="w-full flex-row items-center gap-4">
			<ProfileIcon icon={icon} color={'#1d4ed8'} background="#dbeafe" />

			<View className="flex-1">
				<Text className="font-inter-medium text-lg text-neutral-500">{label}</Text>
				<Text className="font-inter text-lg">{value}</Text>
			</View>
		</View>
	)
}
