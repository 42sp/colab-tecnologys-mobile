import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  value: number;
  height?: number;
	className?: string;
};

export function ColoredProgressBar({ value, height = 16, className }: Props) {
  let colorClass = 'bg-red-500';
  if (value > 0.3) colorClass = 'bg-green-500';

  return (
    <View className={`w-full bg-gray-200 rounded-full overflow-hidden ${className}`} style={{ height }}>
      <View
        className={`${colorClass} rounded-full items-center justify-center`}
        style={{ width: `${Math.min(value * 100, 100)}%`, height }}
      >
				<Text className="text-xs font-inter text-neutral-600">{Math.round(value * 100)}%</Text>
			</View>
    </View>
  );
}