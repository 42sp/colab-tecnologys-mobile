import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, Button, TextInput, Text, TouchableOpacity, View, FlatList } from 'react-native';
import RNDateTimePicker, {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import { Clock, Trash } from 'lucide-react-native';
import { time } from 'node_modules/zod/v4/core/regexes.cjs';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import * as Notifications from 'expo-notifications';
import { set } from 'zod';
import { useSelector } from 'react-redux';
import { RootState } from '@/libs/redux/store';

interface HandleTimeChangeParams {
	event: unknown;
	selectedDate: Date | undefined;
	onChange: (value: string) => void;
}

const NotificationConfig = () => {
	const [show, setShow] = useState(Platform.OS === 'ios' ? true : false);
	const [date, setDate] = useState(new Date());
	const [scheduledNotifications, setScheduledNotifications] = useState<Notifications.NotificationRequest[]>([]);
	const role = useSelector((state: RootState) => state.roles);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm({
		defaultValues: {
			hours: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false }),
		},
	})

	const handleTimeChange = (
		event: HandleTimeChangeParams['event'],
		selectedDate: HandleTimeChangeParams['selectedDate'],
		onChange: HandleTimeChangeParams['onChange']
	): void => {
		if (Platform.OS === 'android')
			setShow(false);
		if (selectedDate) {
			setDate(selectedDate);
			const hours = selectedDate.getHours().toString().padStart(2, '0');
			const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
			onChange(`${hours}:${minutes}`);
		}
	};

	const scheduleDailyNotification = async () => {
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: false,
				shouldSetBadge: false,
				shouldShowBanner: true,
				shouldShowList: true,
			}),
		});

		const existingNotification = scheduledNotifications.find((f: any) => {
			if (Platform.OS === 'ios') {
				return (
					f.trigger?.dateComponents?.hour === date.getHours() &&
					f.trigger?.dateComponents?.minute === date.getMinutes()
				);
		 } else {
				return (
					f.trigger?.hour === date.getHours() &&
					f.trigger?.minute === date.getMinutes()
				);
		 }
		});

		if (existingNotification) {
			alert('Já existe uma notificação agendada para este horário.');
			return;
		}

		if (!date) {
			alert('Por favor, selecione um horário válido.');
			return;
		}

		let body = '';
		if (role.role_name === 'encarregado')
			body = 'Existem serviços aguardando sua aprovação. Por favor, revise e aprove as atividades pendentes.';
		else if (role.role_name === 'executor')
			body = 'Você tem tarefas atribuídas para hoje. Por favor, verifique suas atividades e mantenha o progresso em dia.';
		else
			body = 'Você tem uma notificação diária agendada.';

		await Notifications.scheduleNotificationAsync({
			content: {
				title: 'Lembrete Diário',
				body,
			},
			trigger: {
				type: 'daily',
				hour: date.getHours(),
				minute: date.getMinutes(),
			} as Notifications.DailyTriggerInput
		});

		getScheduledNotifications();
	}

	const requestPermissions = async () => {
		const { status } = await Notifications.requestPermissionsAsync();
		if (status !== 'granted') {
			alert('Permissão para notificações não concedida.');
		}
	};

	useEffect(() => {
		requestPermissions();
		getScheduledNotifications();
	}, []);

	const getScheduledNotifications = async () => {
		const notificacoes : Notifications.NotificationRequest[] = await Notifications.getAllScheduledNotificationsAsync();
		setScheduledNotifications(notificacoes);
	}

	return (
		<SafeAreaView className="flex-1 justify-start items-start m-4 bg-gray-100">
			<View className="gap-1 p-4 bg-white rounded-lg w-full">
				<Text className="font-inter-medium text-lg">Definir lembrete:</Text>
				<Controller
					control={control}
					name="hours"
					render={({ field: { onChange, value } }) => (
						<>
							{
								Platform.OS === 'android' && (
									<TouchableOpacity
										className="flex flex-row items-center w-full border rounded-md text-center p-4"
										onPress={() => setShow(true)}
									>
										<Clock size={18} />
										<Text className='flex font-inter-medium text-md ml-2'>
											{value}
										</Text>
									</TouchableOpacity>
								)
							}
							{show && (
								<RNDateTimePicker
									value={date}
									mode="time"
									display="default"
									is24Hour
									onChange={(event, selectedDate) => handleTimeChange(event, selectedDate, onChange)}
								/>
							)}
						</>
					)}
				/>
				{errors.hours && <Text className="text-red-500">{errors.hours.message}</Text>}
				<View className='my-5'>
					<Text className='font-inter-medium text-lg mt'>Notificações Agendadas:</Text>
					<FlatList
						className='max-h-80'
						data={[...scheduledNotifications].sort((a, b) => {
							const getHourMinute = (notif: any) => {
								if (notif.trigger?.hour !== undefined && notif.trigger?.minute !== undefined) {
									return notif.trigger.hour * 60 + notif.trigger.minute;
							 }
								if (notif.trigger?.dateComponents?.hour !== undefined && notif.trigger?.dateComponents?.minute !== undefined) {
									return notif.trigger.dateComponents.hour * 60 + notif.trigger.dateComponents.minute;
							 }
								return 0;
							};
							return getHourMinute(a) - getHourMinute(b);
						})}
						keyExtractor={(item) => item.identifier}
						renderItem={({ item } : {item: any}) => (
							<View className="p-2 border-b border-gray-200 flex-row items-center justify-between">
								<View className="flex-row items-center">
									<Clock size={18} className="mr-2" />
									<View>
										<Text className="mx-2 font-inter-medium">
											{item.trigger && item.trigger.hour !== undefined && item.trigger.minute !== undefined
												? `${item.trigger.hour}:${item.trigger.minute}`
												: item.trigger && item.trigger.dateComponents && item.trigger.dateComponents.hour !== undefined && item.trigger.dateComponents.minute !== undefined
													? `${item.trigger.dateComponents.hour}:${item.trigger.dateComponents.minute}`
													: 'N/A'}
										</Text>
									</View>
								</View>
								<TouchableOpacity
									onPress={async () => {
										await Notifications.cancelScheduledNotificationAsync(item.identifier);
										getScheduledNotifications();
									}}
								>
									<Text style={{ color: 'red', fontSize: 18 }}>
										<Trash size={14}/>
									</Text>
								</TouchableOpacity>
							</View>
						)}
					/>
				</View>
				<TouchableOpacity
					className="mt-4 w-full bg-black p-4 rounded-lg"
					onPress={scheduleDailyNotification}
				>
					<Text className="text-white text-center">Agendar Notificação Diária</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

export default NotificationConfig;
