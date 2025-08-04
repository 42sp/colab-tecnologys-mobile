import React, { ReactNode } from 'react'
import { Text, View, ViewProps } from 'react-native'

type CardBaseProps = {
	children: ReactNode
	className?: string
} & ViewProps

type CardComponent = React.FC<{ children: ReactNode }> & {
	Header: React.FC<CardBaseProps>
	Body: React.FC<CardBaseProps>
	Footer: React.FC<CardBaseProps>
}

const Card: CardComponent = ({ children }) => {
	return <View className=" rounded-lg bg-white p-5">{children}</View>
}

Card.Header = ({ children, className = '' }) => <View className={className}>{children}</View>

Card.Body = ({ children, className }) => <View className={className}>{children}</View>
Card.Footer = ({ children, className }) => <View className={className}>{children}</View>

export default Card
