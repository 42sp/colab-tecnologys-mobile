import { DrawerParamList } from '@/_layouts/drawer/drawer'
import { StackParamList } from '@/_layouts/stack/stack'
import { TabParamList } from '@/_layouts/tabs/tabs'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

type Navigation = StackNavigationProp<StackParamList> & DrawerNavigationProp<DrawerParamList>

export function useNavigate() {
	const navigation = useNavigation<Navigation>()

	function stack<T extends keyof StackParamList>(screen: T): void
	function stack<T extends keyof StackParamList>(screen: T, params: StackParamList[T]): void
	function stack<T extends keyof StackParamList>(screen: T, params?: StackParamList[T]) {
		// @ts-expect-error
		navigation.navigate(screen, params)
	}

	function tab<T extends keyof TabParamList>(screen: T): void
	function tab<T extends keyof TabParamList>(screen: T, params: TabParamList[T]): void
	function tab<T extends keyof TabParamList>(screen: T, params?: TabParamList[T]) {
		navigation.navigate('tab', {
			screen,
			params,
		})
	}

	return { stack, tab, navigation }
}
