import { View, Text } from 'react-native';
import { Building2, MapPin, User, Clock } from 'lucide-react-native';
import { de } from 'zod/v4/locales';
import { Animated, Easing } from 'react-native';
import React, { useRef, useEffect } from 'react';

type NotificationCardProps = {
  title: string;
  description: string;
  badge?: string;
  meta?: Array<{ icon: React.ReactNode; text: string }>;
  unread?: boolean;
	className?: string;
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  description,
  badge,
  meta = [],
  unread = false,
	className = ''
}) => {
		const AnimatedCircle: React.FC = () => {
			const scale = useRef(new Animated.Value(1)).current;
			const opacity = useRef(new Animated.Value(1)).current;

			useEffect(() => {
				const animate = () => {
					Animated.loop(
						Animated.sequence([
							Animated.parallel([
								Animated.timing(scale, {
									toValue: 1.6,
									duration: 700,
									easing: Easing.inOut(Easing.ease),
									useNativeDriver: true,
								}),
								Animated.timing(opacity, {
									toValue: 0.4,
									duration: 700,
									easing: Easing.inOut(Easing.ease),
									useNativeDriver: true,
								}),
							]),
							Animated.parallel([
								Animated.timing(scale, {
									toValue: 1,
									duration: 700,
									easing: Easing.inOut(Easing.ease),
									useNativeDriver: true,
								}),
								Animated.timing(opacity, {
									toValue: 1,
									duration: 700,
									easing: Easing.inOut(Easing.ease),
									useNativeDriver: true,
								}),
							]),
						])
					).start();
				};
				animate();
			}, [scale, opacity]);

			return (
				<View className='items-center justify-center bg-transparent rounded-l-2xl'>
					{ unread && <Animated.View
						style={{
							width: 8,
							height: 8,
							borderRadius: 4,
							backgroundColor: '#3b82f6',
							transform: [{ scale }],
							opacity,
							left: -6,
						}}
					/>}
				</View>
			);
		}

		return (

			<View className={`flex flex-row rounded-r-2xl mb-3 ${unread ? 'bg-blue-50 border-l-4 rounded-l-2xl border-blue-500' : 'bg-white border-l-4 rounded-l-2xl border-green-500'} ${className}`}>
				<AnimatedCircle />
				<View className="flex-row gap-4 p-4 w-full">
					<View className="w-12 h-12 rounded-full items-center justify-center bg-green-100">
						<Building2 color="#22c55e" size={24} />
					</View>
					<View className="flex-1">
						<View className="flex-row items-center justify-between">
							<Text className="font-bold text-xl">{title}</Text>
							{badge && <Text className="bg-green-500 text-white rounded-full px-2 py-1 text-md ml-2">{badge}</Text>}
						</View>
						<Text className="mt-1 text-gray-700">{description}</Text>
						<View className="flex-row gap-3 mt-2">
							{meta.map((m, i) => (
								<View key={i} className="flex-row items-center gap-1">
									{m.icon}
									<Text className="text-xs text-gray-500 ml-1">{m.text}</Text>
								</View>
							))}
						</View>
					</View>
				</View>
			</View>
		)
	};

export default NotificationCard;
