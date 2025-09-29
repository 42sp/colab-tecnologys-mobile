// src/components/ui/fade-backdrop.tsx
import { Animated, Easing } from 'react-native'
import { useEffect, useRef } from 'react'

type FadeBackdropProps = {
	visible: boolean
	onHidden?: () => void
}

export function FadeBackgroundModal({ visible, onHidden }: FadeBackdropProps) {
	const value = useRef(new Animated.Value(0)).current

	useEffect(() => {
		value.stopAnimation()
		Animated.timing(value, {
			toValue: visible ? 1 : 0,
			duration: 300,
			easing: Easing.out(Easing.ease),
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (finished && !visible) onHidden?.()
		})
	}, [visible, onHidden, value])

	return <Animated.View className="absolute inset-0 bg-black/40" style={{ opacity: value }} />
}
