import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type ButtonVariant = 'primary' | 'secondary'
const buttonVariants: Record<ButtonVariant, { container: string; text: string; }> = {
  primary: {
    container: 'h-16 w-full bg-black items-center justify-center rounded-lg',
    text: 'text-white text-lg',
  },
  secondary: {
    container: "h-16 w-full border-2 border-gray-200 outline-solid bg-white items-center justify-center rounded-lg",
    text: 'text-black text-lg', 
  },
}

type MyButtonProps = {
  title: string
  onPress: () => void
  buttonType: ButtonVariant
}

export function Button ({ title, onPress, buttonType }: MyButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${buttonVariants[buttonType].container}`}
    >
      <Text className={buttonVariants[buttonType].text}>{title}</Text>
    </TouchableOpacity>
  )
}