import { Text, View, Image, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Button } from '@/components/ui/button'

type EditProfileAvatarProps = {
	avatar: string
}

export function EditProfileAvatar({ avatar }: EditProfileAvatarProps) {
	return (
		<View className="items-center gap-3">
			<View className="items-center">
				<View className="size-36 rounded-full border border-neutral-100 bg-white p-1">
					<Image source={{ uri: avatar }} className="h-full w-full rounded-full" />
					<Button variant="rounded" className="mt-[-35px] h-10 w-10 self-end">
						<Feather
							name="user"
							color={'#ffff'}
							size={14}
							onPress={() => console.log('avatar pressionado')}
						/>
					</Button>
				</View>
			</View>

			<TouchableOpacity>
				<Text className="font-inter-bold text-xl text-gray-500">Change profile photo</Text>
			</TouchableOpacity>
		</View>
	)
}
