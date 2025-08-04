import React, {useState} from 'react'
import { TouchableOpacity, View, ViewProps } from 'react-native'
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context'

type SwitchProps = ViewProps & {
  className?: string
}

export function ToggleButton({ className }: SwitchProps) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <SafeAreaProvider>
      <SafeAreaView className={className}>
        <TouchableOpacity
          onPress={toggleSwitch}
          className={`w-14 h-8 rounded-2xl px-1`
            + ( isEnabled ? ' bg-blue-400 justify-end' : ' bg-gray-300 justify-start')
            +  ' flex-row items-center'}
        >
          <View className="w-6 h-6 bg-white rounded-full shadow-sm" />          
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
