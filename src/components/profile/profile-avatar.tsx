import { Image, Text, View } from 'react-native'
import { Button } from '../ui/button'
import { Feather } from '@expo/vector-icons'

import avatarURL from '@/assets/avatar.png'

type ProfileAvatarProps = {
	avatar: string
	name: string
	email: string
}

export function ProfileAvatar({ avatar, name, email }: ProfileAvatarProps) {
	return (
		<View className="items-center">
			<View className="size-36 rounded-full bg-white p-1 shadow-2xl">
				<Image source={avatarURL} className="h-full w-full rounded-full" />
				<Button variant="rounded" className="mt-[-35px] h-10 w-10 self-end">
					<Feather
						name="edit"
						color={'#ffff'}
						size={14}
						onPress={() => console.log('avatar pressionado')}
					/>
				</Button>
			</View>

			<View className="my-3 items-center">
				<Text className="font-inter-bold text-3xl">{name}</Text>
				<Text className="text-center font-inter text-xl text-neutral-500">{email}</Text>
			</View>
		</View>
	)
}
