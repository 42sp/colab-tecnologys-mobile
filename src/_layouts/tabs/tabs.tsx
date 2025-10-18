import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import RegisterServiceScreen from '@/screens/drawer/register-service/register-service';
import Home from '@/screens/drawer/home/home';
import { HomeIcon, Plus, UserIcon } from 'lucide-react-native';
import { Text, View } from 'react-native';
import ProfileScreen from '@/screens/drawer/profile/profile';
import TabsHeader from './tab-header';
import Dashboard from '@/screens/stack/home/dashboard';
import { useSelector } from 'react-redux';
import { RootState } from '@/libs/redux/store';

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
	const role = useSelector((state: RootState) => state.roles);

	return (
		<Tab.Navigator
			screenOptions={{
				animation: 'shift'
			}}
		>
			<Tab.Screen
				name="home"
				component={
					['executor', 'encarregado'].includes(role.role_name)
					? Home : Dashboard }
				options={{
					title: 'Home',
					tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
					header: TabsHeader
				}}
			/>
			{
				['executor', 'encarregado'].includes(role.role_name) &&
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
						</View>,
						header: TabsHeader
					}}
				/>
			}
			<Tab.Screen
				name="profile"
				component={ProfileScreen}
				options={{
					title: "Perfil",
					tabBarIcon: ({ color, size }) => <UserIcon color={color} size={size} />,
					header: TabsHeader
				}}
			/>
		</Tab.Navigator>
	);
}

export default TabsLayout;