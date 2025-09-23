import { ScrollView } from 'react-native'
import Header from './header'
import { Calendar } from './calendar'
import { Activity } from './activity'

export default function ProductivityScreen() {
	return (
		<ScrollView className="flex-1">
			<Header />
			<Calendar />
			<Activity />
		</ScrollView>
	)
}
