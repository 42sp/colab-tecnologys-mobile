import React, { useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, Text } from 'react-native';
import { AbstractChart } from 'react-native-chart-kit';
import Svg, { Path, Circle, Text as SvgText, Rect } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

class GroupedLineChartComponent extends AbstractChart<any, any> {
	render() {
		const { labels, datasets } = this.props.data;
		const chartWidth = this.props.width || screenWidth - 32;
		const chartHeight = this.props.height || 220;
		const padding = 32;
		const pointRadius = 6;
		const maxValue = Math.max(...datasets.flatMap((ds: any) => ds.data));
		const minValue = Math.min(...datasets.flatMap((ds: any) => ds.data));
		const totalPoints = labels.length;
		const dynamicWidth = padding * 2 + (totalPoints - 1) * 60;

		const getPoint = (i: number, value: number) => {
			const x = padding + i * 60;
			const y = chartHeight - ((value - minValue) / (maxValue - minValue)) * chartHeight + 10;
			return { x, y };
		};

		const getLinePath = (data: number[]) => {
			return data.map((value, i) => {
				const { x, y } = getPoint(i, value);
				return `${i === 0 ? 'M' : 'L'}${x},${y}`;
			}).join(' ');
		};

		const getFillPath = (data: number[]) => {
			let path = data.map((value, i) => {
				const { x, y } = getPoint(i, value);
				return `${i === 0 ? 'M' : 'L'}${x},${y}`;
			}).join(' ');

			path += ` L${padding + (data.length - 1) * 60},${chartHeight + 10}`;
			path += ` L${padding},${chartHeight + 10} Z`;
			return path;
		};

		const contentSizeChange = {
			contentWidth: 0,
			contentHeight: 0
		};

		return (
			<View style={{ width: '100%', flexDirection: 'row' }}>

				<Svg width={40} height={chartHeight + 40}>
					{[0, 0.25, 0.5, 0.75, 1].map((p, idx) => (
						<SvgText
							key={idx}
							x={0}
							y={chartHeight - chartHeight * p + 10}
							fontSize={12}
							fill="#888"
							textAnchor="start"
						>
							{Math.round(minValue + (maxValue - minValue) * p)}
						</SvgText>
					))}
				</Svg>

				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					onContentSizeChange={(contentWidth, contentHeight) => {
						contentSizeChange.contentWidth = contentWidth;
						contentSizeChange.contentHeight = contentHeight;
					}}
				>
					<Svg style={{ marginLeft: -25 }} width={dynamicWidth} height={chartHeight + 40}>

						{[0, 0.25, 0.5, 0.75, 1].map((p, idx) => (
							<Rect
								key={idx}
								x={40}
								y={chartHeight - chartHeight * p + 10}
								width={dynamicWidth - 40}
								height={1}
								fill="#e5e7eb"
								onPress={() => this.props.onBarPress && this.props.onBarPress({x: 40, y: chartHeight - chartHeight * p + 10, datasets, i: idx})}
							/>
						))}

						{datasets.map((ds: any, idx: number) => (
							<Path
								key={idx}
								d={getFillPath(ds.data)}
								fill={ds.color + '33'}
								stroke="none"
							/>
						))}

						{datasets.map((ds: any, idx: number) => (
							<Path
								key={idx}
								d={getLinePath(ds.data)}
								fill="none"
								stroke={ds.color}
								strokeWidth={3}
							/>
						))}

						{datasets.map((ds: any, idx: number) => (
							ds.data.map((value: number, i: number) => {
								const { x, y } = getPoint(i, value);
								return (
									<Circle
										key={idx + '-' + i}
										cx={x}
										cy={y}
										r={pointRadius}
										fill="#fff"
										stroke={ds.color}
										strokeWidth={3}
										onPress={(evt) => {
											if (this.props.onMonthPress) {
												const { locationX, locationY, pageX, pageY } = evt.nativeEvent;

												this.props.onMonthPress({
													label: labels[i],
													i,
													x: (screenWidth / 2) - 90,
													y: chartHeight + 30,
													values: this.props.data.datasets.map((ds: any) => ds.data[i]),
													datasets: this.props.data.datasets
												});
											}
										}}
									/>
								);
							})
						))}

						{labels.map((label: string, i: number) => (
							<SvgText
								key={label}
								x={padding + i * 60}
								y={chartHeight + 30}
								fontSize={12}
								fill="#222"
								textAnchor="middle"
							>
								{label}
							</SvgText>
						))}
					</Svg>
				</ScrollView>
			</View>
		);
	}
}

const GroupedLineChart = (props: any) => {
	const [tooltip, setTooltip] = useState<{visible: boolean, x: number, y: number, label: string, values: number[], datasets: any[]}>({visible: false, x: 0, y: 0, label: '', values: [], datasets: []});

		useEffect(() => {
			let timer: NodeJS.Timeout | null = null;
			if (tooltip.visible) {
				timer = setTimeout(() => {
					setTooltip({ ...tooltip, visible: false });
				}, 3000);
			}
			return () => {
				if (timer) clearTimeout(timer);
			};
		}, [tooltip.visible]);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<GroupedLineChartComponent
				data={props.data}
				width={props.width}
				height={props.height}
				onMonthPress={(info: any) => {
					setTooltip({
						visible: true,
						x: (info.x % screenWidth), //- (info.x + 180 > screenWidth ? 140 : 50),
						y: info.y - 120,
						label: info.label,
						values: info.values,
						datasets: info.datasets
					});
				}}
			/>
			{tooltip.visible && (
				<View style={{
					position: 'absolute',
					left: tooltip.x,
					top: tooltip.y,
					backgroundColor: 'rgba(34,34,34,0.95)',
					padding: 12,
					borderRadius: 12,
					minWidth: 180,
					shadowColor: '#000',
					shadowOpacity: 0.2,
					shadowRadius: 8,
				}}>
					<Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>{tooltip.label}</Text>
					{tooltip.datasets.map((ds, idx) => (
						<View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
							<View style={{ width: 18, height: 18, borderRadius: 4, backgroundColor: ds.color + '22', borderWidth: 2, borderColor: ds.color, marginRight: 8 }} />
							<Text style={{ color: '#fff', fontSize: 15 }}>{ds.label || `Executor ${idx + 1}`}: {tooltip.values[idx]}%</Text>
						</View>
					))}
				</View>
			)}
		</View>
	);
};

export default GroupedLineChart;