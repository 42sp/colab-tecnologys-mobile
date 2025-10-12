// import './style.css';
// import { Tabs } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterServiceScreen from '@/screens/drawer/register-service/register-service';
import Home from '@/screens/drawer/home/home';
import { HomeIcon, Plus, UserIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';
import ProfileScreen from '@/screens/drawer/profile/profile';

export type TabParamList = {
	home: undefined
	profile: undefined
	security: undefined
	editProfile: undefined
	registerService: undefined
	homeManager: undefined
	productivity: undefined
}


const Tab = createBottomTabNavigator<TabParamList>();

const TabsLayout = () => {
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