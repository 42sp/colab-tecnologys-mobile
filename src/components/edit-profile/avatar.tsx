import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

export function Avatar() {
	return (
		<View className="items-center gap-3 py-6">
			<View className="relative size-36 rounded-full border border-neutral-100 bg-white p-1">
				<Image
					source={{ uri: 'https://randomuser.me/portraits/men/1.jpg' }}
					className=" h-full w-full rounded-full"
					resizeMode="cover"
				/>
				<View className="absolute bottom-0 right-0 rounded-full bg-black p-2">
					<Feather name="user" size={15} color="#fff" />
				</View>
			</View>

			<TouchableOpacity>
				<Text className="text-lg font-medium text-gray-500">Change profile photo</Text>
			</TouchableOpacity>
		</View>
	)
}
