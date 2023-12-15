"use client";

import React from 'react'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsSunburst from "highcharts/modules/sunburst";
import { countriesData } from '@/app/pages/chart-wrapper/sunburst-chart/sunburst.model';


if (typeof Highcharts === "object") {
	HighchartsSunburst(Highcharts);
}

const SunburstChart = () => {


	const data = countriesData;

	const options = {
		chart: {
			height: '700'
		},
		title: {
			text: 'World population 2017'
		},
		colors: ['transparent'].concat(( Highcharts.getOptions().colors as string[] ) || []),

		subtitle: {
			text: 'Source <a href="https://en.wikipedia.org/wiki/List_of_countries_by_population_(United_Nations)">Wikipedia</a>'
		},
		accessibility: {
			typeDescription:
				'Sunburst chart with 2 levels. The inner level represents continents, and the outer level represents the countries within the continents.',
			point: {
				valueSuffix: ' visitors'
			}
		},
		series: [
			{
				type: 'sunburst',
				name: 'Total',
				data: data,
				allowDrillToNode: true,
				cursor: 'pointer',
				dataLabels: {
					format: '{point.name}',
					color: '#000000',
					style: {
						textOutline: false
					}
				},
				levels: [{
					level: 1,
					levelIsConstant: false,
					dataLabels: {
						filter: {
							property: 'outerArcLength',
							operator: '>',
							value: 64
						}
					}
				}, {
					level: 2,
					colorByPoint: true
				},
					{
						level: 3,
						colorVariation: {
							key: 'brightness',
							to: -0.5
						}
					}, {
						level: 4,
						colorVariation: {
							key: 'brightness',
							to: 0.5
						}
					}]
			}
		],
		tooltip: {
			headerFormat: '',
			pointFormat: '<b style="color:green">{point.name}</b>: <br> <b>{point.value}</b> visitors'
		}
	};

	return (
		<div className="w-full min-h-[500px] max-h-[700px]">
			<div>
				<HighchartsReact
					highcharts={Highcharts}
					options={options}
				/>
			</div>
		</div>
	)

};

export default SunburstChart;