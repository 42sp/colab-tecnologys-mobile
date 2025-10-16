import { Platform, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements'
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

const TabsHeader = ({ navigation, route, options }: BottomTabHeaderProps) => {
	const title = getHeaderTitle(options, route.name)
	const paddingSize = Platform.OS === 'ios' ? 'p-2' : 'p-4'

	return (
		<View className=" relative h-24 w-full " style={{ backgroundColor: 'transparent' }}>
			<LinearGradient
				colors={['#B73131', '#EAA233']}
				start={{ x: 0, y: 0.5 }}
				end={{ x: 1, y: 0.5 }}
				style={{ height: '100%' }}
			>
				<View className={`h-full w-full flex-row items-end ${paddingSize}`}>
					<Text className=" mx-auto font-inter-bold text-xl text-white">{title}</Text>
				</View>
			</LinearGradient>
		</View>
	);
}

export default TabsHeader;