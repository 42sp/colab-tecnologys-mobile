import { View, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Feather } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export type HeaderProps = {
    title: string
}

export function CustomHeader({ title }: HeaderProps) {
    return (
        <View className='h-[72px] flex-row items-center justify-between px-4'>
            <LinearGradient
				colors={['#B73131', '#EAA233']}
				start={{x:0, y:0.5}}
				end={{x:1, y: 0.5}}
				style={{flex: 1}}
				></LinearGradient>
                <TouchableOpacity >
                    <Feather name="chevron-left" size={24} color={'#fff'}/>
                </TouchableOpacity>
                <Text className='text-white text-lg font-inter'>{title}</Text>
                
        </View>
    )
}