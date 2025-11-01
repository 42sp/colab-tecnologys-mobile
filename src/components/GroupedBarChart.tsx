import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { AbstractChart } from 'react-native-chart-kit';
import Svg, { Rect, Text as SvgText, G } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

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
    const dynamicWidth = padding * 2 + totalGroups * ((datasets.filter((f: any) => f.data.reduce((acc: number, val: number) => acc + val, 0) > 0).length + 2) * (barWidth + barSpacing) + groupSpacing);
		const allValues = datasets.flatMap((ds: any) => ds.data);
		const minValue = Math.min(...allValues);
		const maxValueY = Math.max(...allValues);
		const yTicks = [0.25, 0.5, 0.75, 1].map(p => {
			// Interpolate between minValue and maxValueY
			const value = minValue + (maxValueY - minValue) * p;
			return {
				percent: p,
				value,
				label: `${Math.round(value)}%`
			};
		});

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
          {
						yTicks.map((p, idx) => (
							<SvgText
								key={idx}
								x={0}
								y={chartHeight - chartHeight * p.percent + 10}
								fontSize={12}
								fill="#888"
								textAnchor="start"
							>
								{`${p.value.toFixed(2)} %`}
							</SvgText>
						))
					}
        </Svg>
        <ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={{ marginLeft: 10 }}
				>
          <Svg width={dynamicWidth} height={chartHeight + 40}>
						{this.renderHorizontalLines({
              count: 3,
              width: dynamicWidth,
              height: chartHeight,
              paddingTop: 10,
            })}
            <Rect
              x={0}
              y={chartHeight + 10}
              width={dynamicWidth * 2}
              height={2}
              fill="#e5e7eb"
            />
            {
							labels.map((label: string, i: number) => {
								// datasets.map(m => console.log(i, m.data))
								const groupX = padding + i * (
											2
										* (barWidth + barSpacing)
										+ groupSpacing
									);
								// console.log(padding, i, (barWidth + barSpacing), groupSpacing, datasets.filter((f: any) => f.data[i] > 0).length + 2);
								return (
									<G key={label}>
										{datasets
											.filter((f: any) => f.data[i] > 0)
											.map((ds: any, j: number) => {
												const value = ds.data[i];
												const barHeight = (value / maxValue) * chartHeight;
												const x = groupX + j * (barWidth + barSpacing);
												const y = (chartHeight - barHeight + 10);
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
											x={groupX + (datasets.filter((f: any) => f.data[i] > 0).length * (barWidth + barSpacing)) / 2}
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
			}, 5000);
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
							value: info.datasets.map((item: any) => {
								// console.log(item);
								return {
									value: item.data[info.i],
									label: item.floor
								};
							}),
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
          top: 0,
          backgroundColor: '#222',
          padding: 8,
          borderRadius: 8,
					zIndex: 1000,
        }}>
					<ScrollView
						style={{ maxHeight: 200 }}
					>
						{tooltip.value.map((m: any, index) => (
							(
								(
									m.value > 0 &&
									<View key={index} className="flex-row my-1">
										<View style={
											{
												width: 18,
												height: 18,
												borderRadius: 4,
												backgroundColor: tooltip.datasets[index] ? (tooltip.datasets[index].color + '22') : '',
												borderWidth: 2,
												borderColor: tooltip.datasets[index] ? (tooltip.datasets[index].color) : '',
												marginRight: 8,
												zIndex: 10
											}}
										/>
										<Text key={index} style={{color: '#fff'}}>{m.label.replace('PAV', 'Andar')} {m.value}%</Text>
									</View>
								)
							)
						))}
					</ScrollView>
        </View>
      )}
    </View>
	);
}

export { GroupedBarChart };