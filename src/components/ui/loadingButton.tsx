// components/LoadingButton.tsx
import { useEffect, useRef } from 'react'
import { Pressable, Text, ActivityIndicator, Animated, GestureResponderEvent } from 'react-native'

type Props = {
	title: string
	loading?: boolean
	disabled?: boolean
	onPress?: (e: GestureResponderEvent) => void
	className?: string // extra tailwind classes (width, bg, etc.)
	textClassName?: string // customize text
	spinnerColor?: string // fallback uses white
}

export default function LoadingButton({
	title,
	loading = false,
	disabled = false,
	onPress,
	className = '',
	textClassName = '',
	spinnerColor,
}: Props) {
	const textOpacity = useRef(new Animated.Value(1)).current
	const spinnerOpacity = useRef(new Animated.Value(0)).current

	useEffect(() => {
		Animated.parallel([
			Animated.timing(textOpacity, {
				toValue: loading ? 0 : 1,
				duration: 180,
				useNativeDriver: true,
			}),
			Animated.timing(spinnerOpacity, {
				toValue: loading ? 1 : 0,
				duration: 180,
				useNativeDriver: true,
			}),
		]).start()
	}, [loading, textOpacity, spinnerOpacity])

	const isDisabled = disabled || loading

	return (
		<Pressable
			onPress={onPress}
			disabled={isDisabled}
			className={[
				// base styles
				'relative items-center justify-center rounded-2xl px-5 py-1',
				// colors
				isDisabled ? 'bg-gray-400' : 'bg-green-700',
				// press feedback
				!isDisabled && 'active:opacity-90',
				// allow caller overrides
				className,
			].join(' ')}
			accessibilityRole="button"
			accessibilityState={{ disabled: isDisabled, busy: loading }}
			accessibilityLabel={loading ? `${title}, loading` : title}
		>
			{/* Text (fades out when loading) */}
			<Animated.View
				style={{ opacity: textOpacity }}
				className="flex-row items-center"
				pointerEvents="none"
			>
				<Text className={['text-lg font-semibold text-white', textClassName].join(' ')}>
					{title}
				</Text>
			</Animated.View>

			{/* Spinner (fades in when loading) */}
			<Animated.View
				style={{ opacity: spinnerOpacity }}
				className="absolute inset-0 items-center justify-center"
				pointerEvents="none"
			>
				<ActivityIndicator color={spinnerColor ?? '#ffffff'} />
			</Animated.View>
		</Pressable>
	)
}
