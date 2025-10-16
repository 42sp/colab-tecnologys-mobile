import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import NotificationCard from './notification-card';
import { Grape, LocateIcon, MapPin, Timer } from 'lucide-react-native';

const Notification = () => {
	const textSeparatorStyle = "mx-3 my-5 text-gray-700 text-xl font-inter"

	return (
		<SafeAreaView>
			<Text className={textSeparatorStyle}>Hoje</Text>
			<NotificationCard
				className='mx-6 mt-0'
				description='Parabéns! O andar 3 foi concluído com sucesso. Todas as atividades foram finalizadas.'
				meta={[
					{
						icon: <MapPin size={14} />,
						text: "Residencial Jardins"
					},
					{
						icon: <Timer size={14} />,
						text: "14:30"
					},
				]}
				title='Andar 3 Finalizado!'
				badge='Novo'
				unread
			/>
			<NotificationCard
				className='mx-6 mt-0'
				description='Parabéns! O andar 3 foi concluído com sucesso. Todas as atividades foram finalizadas.'
				meta={[
					{
						icon: <MapPin size={14} />,
						text: "Residencial Jardins"
					},
					{
						icon: <Timer size={14} />,
						text: "14:30"
					},
				]}
				title='Andar 3 Finalizado!'
				badge='Novo'
			/>
			<Text className={textSeparatorStyle}>Ontem</Text>
			<Text className={textSeparatorStyle}>Esta Semana</Text>
		</SafeAreaView>
	);
}

export { Notification };