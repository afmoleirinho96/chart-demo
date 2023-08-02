"use client";

import React, { useEffect, useRef, useState } from 'react'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'



// Hook for fetching chart data
const useChartData = (url: string) => {
	const [chartData, setChartData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(url);
				const data = await response.json();
				setChartData(data);
			} catch (error) {
				console.error('Failed to fetch chart data:', error);
			}
		};

		fetchData();
	}, [url]);

	return chartData;
};

const StockChart = () => {
	const chartData = useChartData('https://www.highcharts.com/samples/data/usdeur.json');


	const chartCallback = (chart: any) => {
		const extremeX = chart.xAxis[0].getExtremes();
		const extremeY = chart.yAxis[0].getExtremes();

		const dblclickHandler = () => {
			const currentX = chart.xAxis[0].getExtremes();
			const currentY = chart.yAxis[0].getExtremes();

			if (
				currentX.min !== extremeX.min ||
				currentX.max !== extremeX.max ||
				currentY.min !== extremeY.min ||
				currentY.max !== extremeY.max
			) {
				chart.xAxis[0].setExtremes(extremeX.min, extremeX.max);
				chart.yAxis[0].setExtremes(extremeY.min, extremeY.max);

				if (chart.resetZoomButton) {
					chart.resetZoomButton = chart.resetZoomButton.destroy();
				}
			}
		};

		chart.container.addEventListener('dblclick', dblclickHandler);

		return () => {
			chart.container.removeEventListener('dblclick', dblclickHandler);
		};
	}

	const options = {
		chart: {
			height: 500,
			zoomType: 'xy',
			events: {
				render: (event: any)  => {
					const chart = event.target;
					if (chart.resetZoomButton) {
						chart.resetZoomButton = chart?.resetZoomButton?.destroy();
					}
				}
				}
			},
		rangeSelector: {
			selected: 5,
			inputBoxStyle: {
				right: '80px'
			},
			buttons: [{
				type: 'month',
				count: 1,
				text: '1m'
			}, {
				type: 'month',
				count: 3,
				text: '3m'
			}, {
				type: 'month',
				count: 6,
				text: '6m'
			}, {
				type: 'ytd',
				text: 'YTD'
			}, {
				type: 'year',
				count: 1,
				text: '1y'
			}, {
				type: 'year',
				count: 3,
				text: '3y'
			}, {
				type: 'all',
				text: 'All'
			}],
		},
		series: [{
			name: 'USD to EUR',
			data: chartData
		}],
		exporting: {
			chartOptions: {
				chart: {
					width: 1024,
					height: 768
				}
			}
		}
	};
	return chartData && <div className="w-full min-h-[500px]">
        <HighchartsReact
		highcharts={Highcharts}
		constructorType={'stockChart'}
		callback={chartCallback}
        options={options} /></div>;

};

export default StockChart