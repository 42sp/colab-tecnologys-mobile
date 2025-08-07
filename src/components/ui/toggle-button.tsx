import React, { useState } from 'react'
import { TouchableOpacity, View, ViewProps } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type SwitchProps = ViewProps & {
	className?: string
}

export function ToggleButton({ className }: SwitchProps) {
	const [isEnabled, setIsEnabled] = useState(false)
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState)

	return (
		<SafeAreaView className={className}>
			<TouchableOpacity
				onPress={toggleSwitch}
				className={
					`h-8 w-14 rounded-2xl px-1` +
					(isEnabled ? ' justify-end bg-blue-400' : ' justify-start bg-gray-300') +
					' flex-row items-center'
				}
			>
				<View className="h-6 w-6 rounded-full bg-white shadow-sm" />
			</TouchableOpacity>
		</SafeAreaView>
	)
}
