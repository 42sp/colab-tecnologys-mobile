import React, { useEffect, useState } from 'react'
import {
	View,
	Text,
	TextInput,
	ScrollView,
	TouchableOpacity,
	Dimensions,
	Pressable,
} from 'react-native'
import {
	Bell,
	Search,
	BarChart3,
	ClipboardCheck,
	Layers,
	Zap,
	TrendingUp,
	Building2,
	Building,
} from 'lucide-react-native'
import { Input } from '@/components/ui/input'
import { GroupedBarChart } from '@/components/GroupedBarChart'
import GroupedLineChart from '@/components/GroupedLineChart'
import { getReport } from '@/api/get-report'
import { Dropdown, ItemType } from '@/components/ui/dropdown'
import { getProfiles } from '@/api/get-profiles'
import { set } from 'zod'
import GroupedLineChartUser from '@/components/GroupedLineChartUser'
import { setProfile } from '@/libs/redux/user-profile/user-profile-slice'

const periods : { value: 'day' | 'week' | 'month'; label: string }[] = [{ value: 'day', label: 'Dia' }, { value: 'week', label: 'Semana' }, { value: 'month', label: 'Mês' }]
const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

interface statsData {
	icon: React.ReactNode
	value: number | string
	label: string
	bg: string
}

interface ProductivityChartData {
	labels: string[]
	datasets: {
		data: number[]
		color: string
		label: string
		active: boolean
		floor: string
	}[]
}

const generateColor = () => 'hsl(' + Math.floor(Math.random() * 360) + ', 70%, 60%)'

const calculateProduction = (data: any[], periodProduction: 'week' | 'month'): ProductivityChartData => {
	if (!data || !Array.isArray(data)) return { labels: [], datasets: [] }

	let firstWeekDate: Date | null = null
	if (periodProduction === 'week') {
		// Encontra a menor data para definir como primeira semana
		const dates = data.map(item => new Date(item.periodo))
		firstWeekDate = new Date(Math.min(...dates.map(d => d.getTime())))
	}

	const aux = data.map((item: any) => {
		let label: string

		if (periodProduction === 'week' && firstWeekDate) {
			const date = new Date(item.periodo)
			// Calcula quantas semanas se passaram desde a primeira data
			const weeksDiff = Math.floor((date.getTime() - firstWeekDate.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1
			label = `Sem ${weeksDiff}`
		} else {
			const [ano, mes] = item.periodo.split('-')
			label = meses[parseInt(mes, 10) - 1]
		}

		return {
			label,
			floor: item.floor
				.split(' ')
				.map((m: string, index: number) => (index === 0 ? '' : m))
				.join(' '),
			total: item.total_worker_quantity,
		}
	})

	const labels = aux
		.map((item: any) => item.label)
		.filter((v: any, i: number, a: any[]) => a.indexOf(v) === i)
		.sort((a: string, b: string) => {
			if (periodProduction === 'week') {
				// Ordena por número de semana
				const numA = parseInt(a.replace('Sem ', ''), 10)
				const numB = parseInt(b.replace('Sem ', ''), 10)
				return numA - numB
			}
			return 0 // Para meses, mantém a ordem original
		})

	const floors = aux
		.map((item: any) => item.floor)
		.filter((v: any, i: number, a: any[]) => a.indexOf(v) === i)

	const datasets = floors.map((floor: string) => {
		const color = '#2563eb'
		const data = labels.map((label: string) => {
			const found = aux.find((item: any) => item.floor === floor && item.label === label)
			return found ? Number(found.total) : 0
		})
		return { floor, data, color }
	})

	const chartData = {
		labels,
		datasets: datasets
			.map((ds: any) => ({
				data: ds.data,
				color: ds.color,
				label: ds.floor,
				active: true,
				floor: ds.floor,
			}))
			.sort((a: any, b: any) => Number(a.label) - Number(b.label)),
	}

	return chartData
}

const getWeekNumber = (date: Date): number => {
	const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
	const dayNum = d.getUTCDay() || 7
	d.setUTCDate(d.getUTCDate() + 4 - dayNum)
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
	return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

const calculateProgressByFloor = (data: any[]) => {
	if (!data || !Array.isArray(data)) return { labels: [], datasets: [] }
	// data.map(m => Number(m.porcentagem_acumulada) > 0 && console.log(m.floor.padEnd(7), m.semana, m.porcentagem_acumulada))

	const datasets = data
		.map((item: any) => ({
			floor: item.floor,
			data: data.filter((d) => d.floor === item.floor).map((d) => Number(d.porcentagem_acumulada)),
			color: generateColor(),
		}))
		.reduce((acc: any[], curr: any) => {
			if (!acc.find((a) => a.floor === curr.floor)) {
				acc.push(curr)
			}
			return acc
		}, [])

	// datasets.forEach(m => console.log(m.data));

	return {
		labels: data.map((d) => d.semana).filter((v: any, i: number, a: any[]) => a.indexOf(v) === i),
		datasets,
	}
}

const defineResume = (data: any) => {
	return [
		{
			icon: <ClipboardCheck color="#2563eb" size={24} />,
			value: data.totalCompletedActivities,
			label: 'Atividades Concluídas',
			bg: 'bg-blue-100',
		},
		{
			icon: <Layers color="#eab308" size={24} />,
			value: data.activitiesPerFloorCount,
			label: 'Andares em Andamento',
			bg: 'bg-yellow-100',
		},
		// {
		// 	icon: <Zap color="#22c55e" size={24} />,
		// 	value: '98%',
		// 	label: 'Eficiência Geral',
		// 	bg: 'bg-green-100',
		// }
	]
}

const Dashboard = () => {
	const [activePeriod, setActivePeriod] = useState<'day' | 'week' | 'month'>('day')
	const [activePeriodProduction, setActivePeriodProduction] = useState<'week' | 'month'>('week')

	const [productionData, setProductionData] = useState<ProductivityChartData | null>(null)
	const [progressData, setProgressData] = useState<ProductivityChartData | null>(null)
	const [productivityByUserData, setProductivityByUserData] = useState<ProductivityChartData | null>(null)
	const [stats, setStats] = useState<statsData[]>([])

	const [search, setSearch] = useState('')
	const [profiles, setProfiles] = useState<any[]>([])
	const [profileSelected, setProfileSelected] = useState<ItemType | null>(null)
	const [profileSearch, setProfileSearch] = useState('')

	useEffect(() => {
		const fetchProfiles = async () => {
			const profiles = await getProfiles()
			setProfiles(profiles.data)
		}
		fetchProfiles()
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getReport({
				period: activePeriod,
				worker_id: profileSelected?.value,
				periodProduction: activePeriodProduction,
			})
			// console.log(data.production)
			// data.production.map((m: any) => console.log(m))

			const production = calculateProduction(data.production, activePeriodProduction)
			const progressByFloor = calculateProgressByFloor(data.progressByFloor)
			const resume = defineResume(data.resume)

			data.productivityByUser.datasets = data.productivityByUser.datasets.map((m: any) => ({...m, color: generateColor()}));

			setStats(resume)
			// console.log(production.datasets)
			setProductionData(production)
			setProgressData(progressByFloor)
			setProductivityByUserData(data.productivityByUser)
		}
		fetchData()
	}, [activePeriod, profileSelected, activePeriodProduction]);

	useEffect(() => {
		setProfileSelected(profiles.length > 0 ? { label: profiles[0].name, value: profiles[0].id } : null);
	}, [profiles]);

	const selectProductionData = (item: any) => {
		if (!productionData) return

		const production = productionData.datasets.find((ds) => ds.label === item.label)

		const allActive =
			productionData.datasets.filter((f) => f.active).length === productionData.datasets.length

		// console.log(production)

		const newDatasets = productionData.datasets.map((ds) => ({
			...ds,
			active: !allActive && production?.active ? true : ds.label === item.label,
		}))

		setProductionData({
			...productionData,
			datasets: newDatasets,
		})
	}

	return (
		<View className="flex-1 bg-gray-100">
			<ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>

				<View className="mb-6 flex-row justify-between">
					{stats.map((stat, idx) => (
						<View key={idx} className={`mx-1 flex-1 items-center rounded-xl bg-white p-4 shadow`}>
							<View className={`mb-3 rounded-full p-3 ${stat.bg}`}>{stat.icon}</View>
							<Text className="text-2xl font-bold">{stat.value}</Text>
							<Text className="mt-1 text-center text-xs text-gray-500">{stat.label}</Text>
						</View>
					))}
				</View>

				<View className="mb-6 rounded-xl bg-white p-4 shadow">
					<View className="my-4 flex-row items-center gap-3">
						<View className="rounded-full bg-blue-100 p-3">
							<TrendingUp color="#2563eb" size={24} />
						</View>
						<View>
							<Text className="text-lg font-semibold">Produtividade</Text>
							<Text className="text-sm text-gray-500">Desempenho por usuário</Text>
						</View>
					</View>

					<Input
						keyboardType="default"
						IconLeft="user"
						placeholder="Pesquisar Usuário"
						value={profileSearch}
						onChangeText={setProfileSearch}
					/>
					{
						profileSearch
						&& profileSelected?.label != profileSearch
						&& (
							<ScrollView
								showsVerticalScrollIndicator={true}
								contentContainerStyle={{ paddingVertical: 4 }}
								className="rounded-lg border border-neutral-300"
								style={{ maxHeight: 200 }}
							>
								{
									profiles
										.filter(f => f.name.toLowerCase().includes(profileSearch.toLowerCase()))
										.map((m) => ({ label: m.name, value: m.id }))
										.map((item) => (
											<TouchableOpacity
												key={item.value}
												className="w-full bg-white px-4 py-3 hover:bg-neutral-100"
												onPress={() => {
													setProfileSelected(item)
													setProfileSearch(item.label)
												}}
											>
												<Text className="text-base text-black">{item.label}</Text>
											</TouchableOpacity>
										))
								}
							</ScrollView>
						)
					}
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						className="flex-row gap-3 pb-2 my-4"
					>
						{periods.map((p) => (
							<TouchableOpacity
								key={p.value}
								className={`mx-2 px-4 py-2 rounded-full ${activePeriod === p.value ? 'bg-black' : 'bg-gray-200'} `}
								onPress={() => setActivePeriod(p.value)}
							>
								<Text className={`font-medium ${activePeriod === p.value ? 'text-white' : 'text-black'}`}>{p.label}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>

					<View className="h-75 items-center justify-center rounded-xl">
						{
							productivityByUserData
							&& productivityByUserData.labels.length > 0
							&& productivityByUserData.datasets.length > 0
							?
							(
								<GroupedLineChartUser
									data={productivityByUserData}
									width={300}
									height={150}
									profiles={profiles}
								/>
							)
							:
							(
								<Text className="text-gray-500">Nenhum dado disponível para o usuário selecionado.</Text>
							)
						}
					</View>
				</View>

				<View className="mb-6 rounded-xl bg-white p-4 shadow">
					<View className="mb-4 flex-row items-center gap-3">
						<View className="rounded-full bg-blue-100 p-3">
							<TrendingUp color="#2563eb" size={24} />
						</View>
						<View>
							<Text className="text-lg font-semibold">Produção</Text>
							<Text className="text-sm text-gray-500">Desempenho ao longo do tempo</Text>
						</View>
					</View>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						className="flex-row gap-3 pb-2 my-4"
					>
						{periods.filter(f => f.value != 'day').map((p) => (
							<TouchableOpacity
								key={p.value}
								className={`mx-2 px-4 py-2 rounded-full ${activePeriodProduction === p.value ? 'bg-black' : 'bg-gray-200'} `}
								onPress={() => setActivePeriodProduction(p.value as 'week' | 'month')}
							>
								<Text className={`font-medium ${activePeriodProduction === p.value ? 'text-white' : 'text-black'}`}>{p.label}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>

					<View className="h-75 items-center justify-center rounded-xl">
						{productionData && (
							<GroupedLineChart data={productionData} width={300} height={150} />
						)}
					</View>
				</View>

				<View className="mb-6 rounded-xl bg-white p-4 shadow">
					<View className="mb-4 flex-row items-center gap-3">
						<View className="rounded-full bg-green-100 p-3">
							<Building2 color="#22c55e" size={24} />
						</View>
						<View>
							<Text className="text-lg font-semibold">Andamento por Andar</Text>
							<Text className="text-sm text-gray-500">Progresso ao longo do tempo</Text>
						</View>
					</View>

					<View className="h-50 items-center justify-center rounded-xl">
						{progressData && (
							<GroupedBarChart
								data={progressData}
								width={300}
								height={120}
								yAxisSuffix="%"
								chartConfig={{
									backgroundColor: '#fff',
									backgroundGradientFrom: '#fff',
									backgroundGradientTo: '#fff',
									decimalPlaces: 0,
									color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
									labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
									barPercentage: 0.6,
								}}
							/>
						)}
					</View>

					<View className="mb-5 mt-6 space-y-4">
						<ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 400 }}>
							{progressData?.datasets
								.sort(
									(a, b) =>
										Number(a.floor.replace('PAV ', '')) - Number(b.floor.replace('PAV ', '')),
								)
								.map((dataset, idx) => {
									return (
										dataset.data.reduce((acc: number, val: number) => acc + val, 0) > 0 && (
											<View key={idx} className="my-2 flex-row items-center justify-between">
												<View className="flex-row items-center gap-3">
													<View
														className={`rounded-full p-2 ${dataset.color}`}
														style={{ backgroundColor: dataset.color }}
													>
														<Building color="white" size={16} />
													</View>
													<Text className="font-medium">
														{dataset.floor.replace('PAV ', 'Andar ')}
													</Text>
												</View>
												<View className="flex-row items-center gap-3">
													<View className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
														<View
															style={{
																width: `${dataset.data.reduce((acc: number, val: number) => acc + val, 0)}%`,
																backgroundColor: dataset.color,
															}}
															className={`h-full rounded-full`}
														/>
													</View>
													<Text className="font-mono text-sm font-semibold">
														{dataset.data
															.reduce((acc: number, val: number) => acc + val, 0)
															.toString()
															.padStart(6)}
														%
													</Text>
												</View>
											</View>
										)
									)
								})}
						</ScrollView>
					</View>
				</View>
			</ScrollView>
		</View>
	)
}

export default Dashboard
