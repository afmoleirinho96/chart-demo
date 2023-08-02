"use client";

import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts/highcharts'
import HighchartsReact from 'highcharts-react-official'
import { ThemeName, themes } from '@/app/pages/chart-wrapper/chart-wrapper';

interface LineChartProps {
	theme: ThemeName;
}

const LineChart: React.FC<LineChartProps> = ({ theme }) => {

	const [data, setData] = useState<number[] | null>(null);

	const length = 10_000;
	useEffect(() => {
		const currentTheme = themes[theme];
		currentTheme(Highcharts);

		const generatedData = Array.from({ length }, (_, i) => i);
		setData(generatedData);
	}, []);


	const options = {
		title: {
			text: `Line Chart with ${length} points`
		},
		series: [{
			data: data
		}]
	};

	return (
		<div className="w-full min-h-[500px]">
			{data ? (
				<HighchartsReact
					highcharts={Highcharts}
				/*	constructorType={'stockChart'}*/
					options={options}
				/>
			) : (
				'No data yet, awaiting calculations :)'
			)}
		</div>
	);
};

export default LineChart;