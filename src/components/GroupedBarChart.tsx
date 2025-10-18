import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { AbstractChart } from 'react-native-chart-kit';
import Svg, { Rect, Text as SvgText, G } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

const chartData = {
  labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'],
  datasets: [
    { data: [15, 30, 45, 60, 75, 80, 90, 95], color: '#22c55e' }, // verde
    { data: [0, 10, 20, 35, 50, 60, 70, 75], color: '#2563eb' },  // azul
    { data: [0, 0, 5, 15, 25, 35, 40, 45], color: '#eab308' },    // amarelo
  ],
};

class GroupedBarChartComponent extends AbstractChart<any, any> {
  render() {
    const { labels, datasets } = this.props.data;
    const chartWidth = this.props.width || 100;
    const chartHeight = this.props.height || 220;
    const padding = 32;
    const barWidth = 10;
		const barSpacing = 6;
		const groupSpacing = 16;
		const maxValue = Math.max(...datasets.flatMap((ds: any) => ds.data));
    const totalGroups = labels.length;
    const dynamicWidth = padding * 2 + totalGroups * (datasets.length * (barWidth + barSpacing) + groupSpacing);

    return (
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <Svg width={40} height={chartHeight + 40}>
          <SvgText
            x={0}
            y={chartHeight + 10}
            fontSize={12}
            fill="#888"
            textAnchor="start"
          >
            0%
          </SvgText>
          {[0.25, 0.5, 0.75, 1].map((p, idx) => (
            <SvgText
              key={idx}
              x={0}
              y={chartHeight - chartHeight * p + 10}
              fontSize={12}
              fill="#888"
              textAnchor="start"
            >
              {`${Math.round(p * 100)}%`}
            </SvgText>
          ))}
        </Svg>
        <ScrollView style={{ marginLeft: 0 }} horizontal showsHorizontalScrollIndicator={false}>
          <Svg style={{ marginLeft: -25 }} width={dynamicWidth} height={chartHeight + 40}>
						{this.renderHorizontalLines({
              count: 3,
              width: dynamicWidth,
              height: chartHeight,
              paddingTop: 10,
              paddingRight: 0,
							paddingLeft: 40,
            })}
            <Rect
              x={padding}
              y={chartHeight + 10}
              width={dynamicWidth - padding * 2}
              height={2}
              fill="#e5e7eb"
            />
            {labels.map((label: string, i: number) => {
              const groupX = padding + i * (datasets.length * (barWidth + barSpacing) + groupSpacing);
              return (
                <G key={label}>
                  {datasets.map((ds: any, j: number) => {
                    const value = ds.data[i];
                    const barHeight = (value / maxValue) * chartHeight;
                    const x = groupX + j * (barWidth + barSpacing);
                    const y = chartHeight - barHeight + 10;
                    return (
                      <Rect
                        key={j}
                        x={x}
                        y={y}
                        width={barWidth}
                        height={barHeight}
                        fill={ds.color}
                        rx={2}
												onPress={() => this.props.onBarPress && this.props.onBarPress(
													{x, y, datasets, i}
												)}
                      />
                    );
                  })}
                  <SvgText
                    x={groupX + (datasets.length * (barWidth + barSpacing)) / 2}
                    y={chartHeight + 30}
                    fontSize={12}
                    fill="#222"
                    textAnchor="middle"
                  >
                    {label}
                  </SvgText>
                </G>
              );
            })}
          </Svg>
        </ScrollView>
      </View>
    );
	}
}


const GroupedBarChart = (props: any) => {
  const [tooltip, setTooltip] = useState<
		{
			visible: boolean,
			x: number,
			y: number,
			value: number[],
			ds: any,
			datasets: any[]
		}
	>
	(
		{
			visible: false,
			x: 0,
			y: 0,
			value: [],
			ds: undefined,
			datasets: []
		}
	);

	useEffect(() => {
		if (tooltip.visible)
		{
			setTimeout(() => {
				setTooltip({ ...tooltip, visible: false });
			}, 99999);
		}
	}, [tooltip])

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <GroupedBarChartComponent
        {...props}
        onBarPress={(info: any) => setTooltip(
						{
							visible: true,
							x: info.x,
							y: info.y,
							value: info.datasets.map((item: any) => item.data[info.i]),
							ds: info.ds,
							datasets: info.datasets
						}
					)
				}
      />
      {tooltip.visible && (
        <View style={{
          position: 'absolute',
          left: screenWidth / 2 - 90,
          top: tooltip.y,
          backgroundColor: '#222',
          padding: 8,
          borderRadius: 8,
        }}>
					{tooltip.value.map((value, index) => (
						<View key={index} className="flex-row my-1">
							<View style={
								{
									width: 18,
									height: 18,
									borderRadius: 4,
									backgroundColor: tooltip.datasets[index] ? (tooltip.datasets[index].color + '22') : '',
									borderWidth: 2,
									borderColor: tooltip.datasets[index] ? (tooltip.datasets[index].color) : '',
									marginRight: 8
								}}
							/>
							<Text key={index} style={{color: '#fff'}}>Andar {index + 1}: {value}%</Text>
						</View>
					))}
        </View>
      )}
    </View>
	);
}

export { GroupedBarChart };