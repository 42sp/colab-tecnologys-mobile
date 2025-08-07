import { Text, View } from 'react-native'

type SignInDivisorProps = {
	text?: string
	className?: string
}

export function SignInDivisor({ text, className }: SignInDivisorProps) {
	return (
		<View className={`flex flex-row items-center ${className}`}>
			<View className="h-px flex-1 bg-neutral-400" />
			<Text className="px-3 font-inter text-lg text-gray-500">{text}</Text>
			<View className="h-px flex-1 bg-neutral-400" />
		</View>
	)
}
