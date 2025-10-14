// import './style.css';
// import { Tabs } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterServiceScreen from '@/screens/drawer/register-service/register-service';
import Home from '@/screens/drawer/home/home';
import { HomeIcon, Plus, UserIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';
import ProfileScreen from '@/screens/drawer/profile/profile';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export type TabParamList = {
	home: undefined
	profile: undefined
	security: undefined
	editProfile: undefined
	registerService: undefined
	homeManager: undefined
	productivity: undefined
}

const triggerSeconds = 60 * 60;

const Tab = createBottomTabNavigator<TabParamList>();

const TabsLayout = () => {

	useEffect(() => {
		const scheduleNotification = async (date: Date) => {
			Notifications.setNotificationHandler({
				handleNotification: async () => ({
					shouldShowAlert: true,
					shouldPlaySound: false,
					shouldSetBadge: false,
					shouldShowBanner: true,
					shouldShowList: true,
				}),
			});

			await Notifications.scheduleNotificationAsync({
				content: {
					title: 'Atenção',
					body: 'Existem serviços aguardando sua aprovação. Por favor, revise e aprove as atividades pendentes.',
				},
				trigger: {
					type: 'daily',
					hour: 22,
					minute: 33,
				}
			});

			const notificacoes = await Notifications.getAllScheduledNotificationsAsync();
  		console.log(notificacoes);
		};


		scheduleNotification(new Date(2025, 9, 13, 22, 20));
	}, []);



	return (
		<Tab.Navigator
			screenOptions={{
				animation: 'shift'
			}}
		>
			<Tab.Screen
				name="home"
				component={Home}
				options={{
					title: 'Home',
					tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
				}}
			/>
			<Tab.Screen
				name="registerService"
				component={RegisterServiceScreen}
				options={{
					title: 'Registrar',
					tabBarLabel: ({ color, focused }) => focused ? '' : <Text style={{ color, fontSize: 10 }}>Registrar</Text>,
					tabBarIcon: ({ color, size, focused }) => <View
						className={`${focused ? 'w-[56px] h-[56px] items-center justify-center' : 'bg-transparent'} rounded-full p-2`}
						style={{ backgroundColor: focused ? color : 'transparent' }}
					>
						<Plus
							color={focused ? '#FFFFFF' : color}
							size={size}
						/>
					</View>
				}}
			/>
			<Tab.Screen
				name="profile"
				component={ProfileScreen}
				options={{
					title: "Perfil",
					tabBarIcon: ({ color, size }) => <UserIcon color={color} size={size} />,
				}}
			/>
		</Tab.Navigator>
	);
}

export default TabsLayout;