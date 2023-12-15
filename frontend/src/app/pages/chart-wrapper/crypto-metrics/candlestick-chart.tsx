"use client";

import React, { FC, useEffect, useState } from "react";
import Highcharts from "highcharts/highcharts";
import HighchartsReact from "highcharts-react-official";
import HC_more from "highcharts/highcharts-more";
import HC_exporting from "highcharts/modules/exporting";
import stockInit from "highcharts/modules/stock";
import { getCandlestickData } from "@/app/services/crypto-metrics/crypto-metrics.service";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Tooltip } from "@mui/material";
import BrandDark from "highcharts/themes/brand-dark";

// Initialize modules
if (typeof Highcharts === "object") {
  HC_more(Highcharts);
  stockInit(Highcharts);
  HC_exporting(Highcharts);
}

BrandDark(Highcharts);

interface CandlestickChartProps {
  currentToken: string;
}

const CandlestickChart: FC<CandlestickChartProps> = ({ currentToken }) => {
  const [candleStickData, setCandleStickData] = useState<boolean>(false);

  useEffect(() => {
    const getCandleStickPrices = async () => {
      const { data } = await getCandlestickData(currentToken);
      setCandleStickData(data);
    };

    getCandleStickPrices();
  }, [currentToken]);

  const options = {
    chart: {
      height: 400,
      width: 1200,
      zoomType: "xy",
    },
    plotOptions: {
      candlestick: {
        color: 'pink',
        lineColor: 'red',
        upColor: 'lightgreen',
        upLineColor: 'green',
      }
    },
    title: {
      text: `${currentToken?.[0]?.toUpperCase() + currentToken?.slice(1)} Candlestick Chart, in USD`,
    },
    yAxis: {
      opposite: false, // Ensure y-axis is on the left; it's the default, but added for clarity
    },
    series: [
      {
        type: "candlestick",
        name: "Bitcoin",
        dataGrouping: {
          enabled: false,
        },
        data: candleStickData,
        tooltip: {
          valueDecimals: 2,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col w-full justify-between gap-y-2">
      <p className="flex items-center text-slate-600 font-medium text-md">
        Visualize the opening, closing, lowest, and highest values, over the <span className="font-bold ml-1"> past 90 days</span>.
        <Tooltip
          title="Given API constraints, the data granularity for 31 days and beyond is 4 days "
        >
          <InfoOutlinedIcon className="text-slate-600 cursor-pointer ml-2" />
        </Tooltip>
      </p>
      <div className="mt-4">
        <HighchartsReact highcharts={Highcharts} constructorType={"stockChart"} options={options} />
      </div>
    </div>
  );
};

export default CandlestickChart;
