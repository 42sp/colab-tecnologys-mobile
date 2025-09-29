import { DrawerParamList } from '@/_layouts/drawer/drawer'
import { StackParamList } from '@/_layouts/stack/stack'
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

	function drawer<T extends keyof DrawerParamList>(screen: T): void
	function drawer<T extends keyof DrawerParamList>(screen: T, params: DrawerParamList[T]): void
	function drawer<T extends keyof DrawerParamList>(screen: T, params?: DrawerParamList[T]) {
		navigation.navigate('drawer', {
			screen,
			params,
		})
	}

	return { stack, drawer, navigation }
}
