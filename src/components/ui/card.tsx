import React, { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

type CardBaseProps = {
	children: ReactNode
	className?: string
} & ViewProps

type CardComponent = React.FC<CardBaseProps> & {
	Header: React.FC<CardBaseProps>
	Body: React.FC<CardBaseProps>
	Footer: React.FC<CardBaseProps>
}

const Card: CardComponent = ({ children, className }) => {
	return (
		<View className={`gap-2 rounded-xl border border-neutral-100 bg-white p-3 ${className}`}>
			{children}
		</View>
	)
}

Card.Header = ({ children, className }) => <View className={className}>{children}</View>

Card.Body = ({ children, className }) => <View className={className}>{children}</View>
Card.Footer = ({ children, className }) => <View className={className}>{children}</View>

export default Card
