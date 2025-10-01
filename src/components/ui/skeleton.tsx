import React, { useEffect } from 'react'
import { View, StyleSheet, ViewProps } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withRepeat,
	withTiming,
} from 'react-native-reanimated'

interface SkeletonProps extends ViewProps {
	className?: string
	borderRadius?: number
}

export function Skeleton({ className, style, borderRadius = 8, ...props }: SkeletonProps) {
	const shimmerTranslate = useSharedValue(-1)

	useEffect(() => {
		shimmerTranslate.value = withRepeat(withTiming(1, { duration: 1200 }), -1, false)
	}, [shimmerTranslate])

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{
				translateX: shimmerTranslate.value * 300, // ajuste conforme o tamanho do skeleton
			},
		],
	}))

	return (
		<View
			className={`overflow-hidden bg-gray-200 ${className ?? ''}`}
			style={[{ borderRadius }, style]}
			{...props}
		>
			<Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
				<LinearGradient
					colors={['#e0e0e0', '#f5f5f5', '#e0e0e0']}
					start={{ x: 0, y: 0.5 }}
					end={{ x: 1, y: 0.5 }}
					style={StyleSheet.absoluteFill}
				/>
			</Animated.View>
		</View>
	)
}
