import { Text, View, TouchableOpacity, Modal } from 'react-native'
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { Feather } from '@expo/vector-icons'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { FilterModal } from '@/components/FilterModal'
import { SummaryCard } from '@/components/summary-card'
import { ActivityList } from '@/components/ui/activity-list'
import { mockData } from './mock-for-home'
import { HorizontalList } from '@/components/ui/horizontal-list'

export default function Home() {
	const { control } = useForm()
	const [showFilter, setShowFilter] = useState(false)
	const [Selected, setSelected] = useState('Todos')
	const options = ['Todos', 'Contrapiso', 'Revestimento', 'Pintura', 'Alvenaria']

	return (
		<SafeAreaView className="flex-1 gap-5 bg-[#F9FAFB] p-5">
			<View className="flex-row items-center gap-5">
				<View className="flex-1">
					<Controller
						control={control}
						name="email"
						render={({ field: { onChange, onBlur, value } }) => (
							<View>
								<Input
									keyboardType="default"
									IconLeft="search"
									placeholder="Search tasks"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									className="bg-white"
								/>
							</View>
						)}
					/>
				</View>
				<TouchableOpacity
					className="rounded-lg bg-black p-3"
					onPress={() => setShowFilter(true)}
					activeOpacity={0.7}
				>
					<Feather name="filter" size={24} color="#FFF" />
				</TouchableOpacity>
			</View>

			<HorizontalList
				options={options}
				selected={Selected}
				onSelect={(value) => setSelected(value)}
			/>

			<FilterModal
				visible={showFilter}
				onClose={() => setShowFilter(false)}
				onApply={(filters) => {
					console.log(filters)
				}}
			/>

			<View className="flex-row gap-4">
				<SummaryCard icon="clipboard" SumaryVariant="blue" value="1000" label="Activities" />

				<SummaryCard icon="clock" SumaryVariant="orange" value="200" label="Pending" />

				<SummaryCard icon="bar-chart" SumaryVariant="green" value="75%" label="Productivity" />
			</View>
			<ActivityList
				className="flex-1"
				data={[
					{
						title: '',
						data: mockData,
					},
				]}
			/>
		</SafeAreaView>
	)
}
