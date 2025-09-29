import { View } from 'react-native'
import { Feather } from '@expo/vector-icons'

type ProfileIconProps = {
	icon: keyof typeof Feather.glyphMap
	color: string
	background: string
}

export function ProfileIcon({ icon, color, background }: ProfileIconProps) {
	return (
		<View
			className="size-14 items-center justify-center"
			style={{ backgroundColor: background, borderRadius: '50%' }}
		>
			<Feather name={icon} size={20} color={color} />
		</View>
	)
}
