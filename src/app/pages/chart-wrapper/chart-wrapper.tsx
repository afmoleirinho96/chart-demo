"use client";

import React, { useEffect, useState } from 'react';
import LineChart from '@/app/pages/chart-wrapper/line-chart/line-chart';
import StockChart from '@/app/pages/chart-wrapper/stock-chart/stock-chart';
import SunburstChart from '@/app/pages/chart-wrapper/sunburst-chart/sunburst-chart';
import Highcharts from 'highcharts/highcharts';
import DarkUnica from 'highcharts/themes/dark-unica';
import SandSignika from 'highcharts/themes/sand-signika';
import Avocado from 'highcharts/themes/avocado';
import BrandDark from 'highcharts/themes/brand-dark';
import BrandLight from 'highcharts/themes/brand-light';
import { useTheme } from '@/app/pages/context';

enum ChartType {
	LineChart = 'Line Chart',
	StockChart = 'Stock Chart',
	SunburstChart =  'Sunburst Chart',
	MultiSeries = 'Multi Series Chart'
}





export const themes = {
	dark: DarkUnica,
	sand: SandSignika,
	avocado: Avocado,
	brandDark: BrandDark,
	brandLight: BrandLight,
	// Add more themes here
};

export type ThemeName = 'dark' | 'sand' | 'avocado' | 'brandDark';  // Add more theme names here




const ChartWrapper = () => {
	const [themeReady, setThemeReady] = useState(false);
	const { theme, setTheme } = useTheme();




	useEffect(() => {
		console.log('Current chartKey:', theme);
		const themeModule = themes[theme as ThemeName];
		//themeModule(Highcharts);
		setThemeReady(true);
	}, [theme]);


	const changeTheme = (newTheme: ThemeName) => {
		setTheme(newTheme);
		setThemeReady(false);
	};



	const [shownCharts, setShownCharts] = useState<Record<ChartType, boolean>>({
		[ChartType.LineChart]: false,
		[ChartType.StockChart]: false,
		[ChartType.SunburstChart]: false,
		[ChartType.MultiSeries]: false,
	});

	const charts = [
		{ type: ChartType.LineChart, component: <LineChart theme={theme as ThemeName}/> },
		{ type: ChartType.StockChart, component: <StockChart/> },
		{ type: ChartType.SunburstChart, component: <SunburstChart/> },
	];

	const toggleChart = (chartType: ChartType) => {
		setShownCharts(prev => ( { ...prev, [chartType]: !prev[chartType] } ));
	};

	return (
		<div className="flex w-full flex-col gap-y-10">
			<div>
				<select value={theme} onChange={(e) => changeTheme(e.target.value as ThemeName)}>
					{Object.keys(themes).map((theme) => (
						<option key={theme} value={theme}>{theme}</option>
					))}
				</select>
			</div>

			{themeReady && charts.map(({ type, component }) => (
				<div key={type}>
					<div className="flex justify-center mb-4">
						<button
							className="bg-blue-300 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded"
							onClick={() => toggleChart(type)}
						>
							<p>{shownCharts[type] ? `Hide ${type} Chart` : `Show ${type} Chart`}</p>
						</button>
					</div>

					<div className="flex w-full">
						{shownCharts[type] && component}
					</div>
				</div>
			))}
		</div>
	);
};

export default ChartWrapper;