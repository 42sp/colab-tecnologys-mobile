import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { Bell, Search, BarChart3, ClipboardCheck, Layers, Zap, TrendingUp, Building2, Building } from 'lucide-react-native';
import { Input } from '@/components/ui/input';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
	AbstractChart
} from "react-native-chart-kit";
import { GroupedBarChart } from '@/components/GroupedBarChart';
import GroupedLineChart from '@/components/GroupedLineChart';
import { getReport } from '@/api/get-report';

const stats = [
  {
    icon: <ClipboardCheck color="#2563eb" size={24} />,
    value: 320,
    label: 'Atividades Concluídas',
    bg: 'bg-blue-100',
  },
  {
    icon: <Layers color="#eab308" size={24} />,
    value: 12,
    label: 'Andares em Andamento',
    bg: 'bg-yellow-100',
  },
  {
    icon: <Zap color="#22c55e" size={24} />,
    value: '98%',
    label: 'Eficiência Geral',
    bg: 'bg-green-100',
  },
];

const periods = ['Mês', 'Trimestre', 'Ano', 'Todos'];

const data = {
  labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
  datasets: [
    { data: [12.5, 30, 45, 60, 75, 80, 90, 95], color: '#22c55e' },
    { data: [0, 10, 20, 35, 50, 60, 70, 75], color: '#2563eb' },
    { data: [0, 0, 5, 15, 25, 35, 40, 45], color: '#eab308' },
  ],
};

const dataLineChart = {
	labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
	datasets: [
		{ data: [320, 330, 340, 345, 350, 355, 360, 340, 345, 350, 345, 340], color: '#22c55e' },
		{ data: [330, 340, 350, 355, 360, 365, 370, 360, 365, 370, 365, 360], color: '#eab308' },
		{ data: [340, 350, 360, 365, 370, 375, 380, 370, 375, 380, 375, 370], color: '#2563eb' },
	],
};

interface ProductivityChartData {
	labels: string[];
	datasets: {
		data: number[];
		color: string;
		label: string;
		active: boolean;
	}[];
};

const generateColor = (() => {
	const usedColors = new Set<string>();
	return () => {
		let color;
		do {
			const hue = Math.floor(Math.random() * 360);
			color = `hsl(${hue}, 70%, 60%)`;
		} while (usedColors.has(color));
		usedColors.add(color);
		return color;
	};
})();

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

const Dashboard = () => {
  const [activePeriod, setActivePeriod] = useState('Todos');
  const [search, setSearch] = useState('');
	const [floor, setFloor] = useState(null);

  const [productivityData, setProductivityData] = useState<ProductivityChartData | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getReport();
			const aux = data.Report.map((item: any) => {
				const [ano, mes] = item.ano_mes.split('-');
				const mesAbrev = meses[parseInt(mes, 10) - 1];

				return {
					mes: mesAbrev,
					floor: item.floor
						.split(' ')
						.map((m: string, index: number) =>  index === 0 ? '' : m )
						.join(' '),
					total: item.total_worker_quantity
				}
			});

			const labels = aux
				.map((item: any) => item.mes)
				.filter((v: any, i: number, a: any[]) => a.indexOf(v) === i);

			const floors = aux
				.map((item: any) => item.floor)
				.filter((v: any, i: number, a: any[]) => a.indexOf(v) === i);

			const datasets = floors.map((floor: string) => {
				const color = generateColor();
				const data = labels.map((mes: string) => {
					const found = aux.find((item: any) => item.floor === floor && item.mes === mes);
					return found ? Number(found.total) : 0;
				});
				return { floor, data, color };
			});

			const chartData = {
				labels,
				datasets: datasets.map((ds: any) => ({
					data: ds.data,
					color: ds.color,
					label: ds.floor,
					active: true,
				})).sort((a: any, b: any) => Number(a.label) - Number(b.label)),
			};
			// chartData.datasets.map(m => console.log(m))
			setProductivityData(chartData);
		}
		fetchData();
	}, []);

  const selectProductivityData = (item: any) => {
    if (!productivityData) return;

		const productivity = productivityData.datasets
			.find(ds => ds.label === item.label);

		const allActive = productivityData.datasets.filter(f => f.active).length === productivityData.datasets.length;

		console.log(productivity)

    const newDatasets = productivityData.datasets.map(ds => ({
      ...ds,
      active: !allActive && productivity?.active ? true : ds.label === item.label,
    }));

    setProductivityData({
      ...productivityData,
      datasets: newDatasets,
    });
  }

  return (
    <View className="flex-1 bg-gray-100">
      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row gap-3 mb-4 items-center">
          <View className="flex-1 relative m-2">
            <Input
							IconLeft='search'
              value={search}
              onChangeText={setSearch}
              className="bg-gray-100 rounded-full text-base"
            />
          </View>
          <TouchableOpacity className="bg-black rounded-full items-center justify-center h-[40px] w-[40px]">
            <BarChart3 color="white" size={18} />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3 pb-2 mb-4">
          {periods.map((p) => (
            <TouchableOpacity
              key={p}
              className={`mx-2 px-4 py-2 rounded-full ${activePeriod === p ? 'bg-black' : 'bg-gray-200'} `}
              onPress={() => setActivePeriod(p)}
            >
              <Text className={`font-medium ${activePeriod === p ? 'text-white' : 'text-black'}`}>{p}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row justify-between mb-6">
          {stats.map((stat, idx) => (
            <View key={idx} className={`flex-1 mx-1 bg-white rounded-xl shadow p-4 items-center`}>
              <View className={`mb-3 p-3 rounded-full ${stat.bg}`}>{stat.icon}</View>
              <Text className="text-2xl font-bold">{stat.value}</Text>
              <Text className="text-xs text-gray-500 mt-1 text-center">{stat.label}</Text>
            </View>
          ))}
        </View>

        <View className="bg-white rounded-xl shadow p-4 mb-6">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="p-3 rounded-full bg-blue-100">
              <TrendingUp color="#2563eb" size={24} />
            </View>
            <View>
              <Text className="text-lg font-semibold">Produtividade</Text>
              <Text className="text-sm text-gray-500">Desempenho ao longo do tempo</Text>
            </View>
          </View>

          <View className="h-75 rounded-xl items-center justify-center">
            {productivityData && (
              <GroupedLineChart
                data={productivityData}
                width={300}
                height={150}
              />
            )}
          </View>

          <View className="flex-row justify-center gap-4 mt-4">
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{
								productivityData &&
								productivityData.datasets.map(m =>
									<Pressable
										className="flex-row items-center gap-2 px-4"
										key={m.label}
										onPress={() => selectProductivityData(m)}
									>
										<View className="w-4 h-4 rounded-full" style={{ backgroundColor: m.color }} />
										<Text className="text-sm">Andar {m.label}</Text>
									</Pressable>
								)
							}
						</ScrollView>
          </View>
        </View>

        <View className="bg-white rounded-xl shadow p-4 mb-6">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="p-3 rounded-full bg-green-100">
              <Building2 color="#22c55e" size={24} />
            </View>
            <View>
              <Text className="text-lg font-semibold">Andamento por Andar</Text>
              <Text className="text-sm text-gray-500">Progresso ao longo do tempo</Text>
            </View>
          </View>

          <View className="h-50 rounded-xl items-center justify-center">
            <GroupedBarChart
							data={data}
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
          </View>

          <View className="mt-6 space-y-4">
            {[
              { name: 'Andar 1', percent: 95, color: 'bg-green-500' },
              { name: 'Andar 2', percent: 75, color: 'bg-blue-500' },
              { name: 'Andar 3', percent: 45, color: 'bg-yellow-400' },
            ].map((floor, idx) => (
              <View key={idx} className="my-2 flex-row items-center justify-between">
                <View className="flex-row items-center gap-3">
                  <View className={`p-2 rounded-full ${floor.color}`}>
                    <Building color="white" size={16} />
                  </View>
                  <Text className="font-medium">{floor.name}</Text>
                </View>
                <View className="flex-row items-center gap-3">
                  <View className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <View style={{ width: `${floor.percent}%` }} className={`h-full rounded-full ${floor.color}`} />
                  </View>
                  <Text className="font-mono font-semibold text-sm">{floor.percent}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Dashboard;