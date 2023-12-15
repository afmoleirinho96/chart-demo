//@ts-nocheck
"use client";

import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";
import { getTokenHistory } from "@/app/services/crypto-metrics/crypto-metrics.service";

import classNames from "classnames";
import { DEFAULT_TOKEN } from "@/app/models/crypto-metrics";

enum ViewType {
  MARKET_CAP = "market_cap",
  PRICE_HISTORY = "price_history",
}

interface DataPoint {
  timestamp: number;
  value: number;
}

interface MaxMinData {
  maxPrice: DataPoint;
  minPrice: DataPoint;
  maxMarketCap: DataPoint;
  minMarketCap: DataPoint;
}

const findMaxMin = (dataArray: number[][]): { maxData: number; minData: number } => {
  const filteredData = dataArray.filter((item) => item[1] !== null);
  const maxData = filteredData.reduce((max, item) => (item[1] > max[1] ? item : max), filteredData[0]);
  const minData = filteredData.reduce((min, item) => (item[1] < min[1] ? item : min), filteredData[0]);

  return { maxData, minData };
};

interface HistoryChartProps {
  currentToken: string;
}

const HistoryChart: FC<HistoryChartProps> = ({ currentToken = DEFAULT_TOKEN }) => {
  const [tokenToUsdMetrics, setTokenToUsdMetrics] = useState(null);
  const [viewType, setViewType] = useState(ViewType.PRICE_HISTORY);

  const highchartsReactRefObject = useRef<HighchartsReactRefObject>(null);

  useEffect(() => {
    updateYAxis();
  }, [viewType, tokenToUsdMetrics]);

  useEffect(() => {
    const getTokenDetails = async () => {
      const { data } = await getTokenHistory(currentToken);

      if (!data) {
        return;
      }
      setTokenToUsdMetrics(data);
    };

    getTokenDetails();
  }, [currentToken]);

  const maxMinDataMemo: MaxMinData = useMemo(() => {
    if (!tokenToUsdMetrics) {
      return;
    }

    const { maxData: maxPrice, minData: minPrice } = findMaxMin(tokenToUsdMetrics.prices);
    const { maxData: maxMarketCap, minData: minMarketCap } = findMaxMin(tokenToUsdMetrics.market_caps);

    return {
      maxPrice: { timestamp: maxPrice[0], value: maxPrice[1] },
      minPrice: { timestamp: minPrice[0], value: minPrice[1] },
      maxMarketCap: { timestamp: maxMarketCap[0], value: maxMarketCap[1] },
      minMarketCap: { timestamp: minMarketCap[0], value: minMarketCap[1] },
    };
  }, [tokenToUsdMetrics]);

  const updateYAxis = () => {
    const chart = highchartsReactRefObject?.current?.chart;

    if (!chart) {
      return;
    }
    chart.update({
      yAxis:
        viewType === ViewType.PRICE_HISTORY
          ? {
              max: maxMinDataMemo.maxPrice.value,
              min: maxMinDataMemo.minPrice.value,
            }
          : {
              max: maxMinDataMemo.maxMarketCap.value,
              min: maxMinDataMemo.minMarketCap.value,
            },
    });
  };

  const changeViewType = (viewType: ViewType) => {
    setViewType(viewType);
  };

  const options = {
    title: {
      text: `${currentToken?.[0]?.toUpperCase() + currentToken?.slice(1)} ${viewType === ViewType.PRICE_HISTORY ? "Price" : "Market Cap"} History`,
      align: "center",
    },
    chart: {
      height: 500,
      zoomType: "xy",
    },
    yAxis: {
      opposite: false,
      offset: 10,
      labels: {
        formatter: function () {
          if (this.value >= 1e12) {
            return (this.value / 1e12).toLocaleString() + " T";
          } else if (this.value >= 1e9) {
            return (this.value / 1e9).toLocaleString() + " B";
          } else if (this.value >= 1e6) {
            return (this.value / 1e6).toLocaleString() + " M";
          } else if (this.value >= 1e3) {
            return (this.value / 1e3).toLocaleString() + " K";
          } else {
            return this.value;
          }
        },
      },
    },
    tooltip: {
      valueDecimals: 2,
      formatter: function () {
        return `<b>${this.series.name}<b>: ${this.y.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
      },
    },
    series: [
      {
        type: "line",
        id: "historySeries",
        color: "#32DCD6",
        data: viewType === ViewType.PRICE_HISTORY ? tokenToUsdMetrics?.prices : tokenToUsdMetrics?.market_caps,
        name: viewType === ViewType.PRICE_HISTORY ? "Price ($)" : "Market Cap ($)",
      },
      {
        type: "flags",
        name: "Extreme",
        accessibility: {
          exposeAsGroupOnly: true,
          description: "Flagged events.",
        },
        ...(maxMinDataMemo && {
          data:
            viewType === ViewType.PRICE_HISTORY
              ? [
                  {
                    x: maxMinDataMemo.minPrice.timestamp,
                    title: "Min Price",
                  },
                  {
                    x: maxMinDataMemo.maxPrice.timestamp,
                    title: "Max Price",
                  },
                ]
              : [
                  {
                    x: maxMinDataMemo.minMarketCap.timestamp,
                    title: "Min Market Cap",
                  },
                  {
                    x: maxMinDataMemo.maxMarketCap.timestamp,
                    title: "Max Market Cap",
                  },
                ],
          onSeries: "historySeries",
          shape: "circlepin",
          width: 96,
        }),
      },
    ],
    exporting: {
      chartOptions: {
        chart: {
          width: 1024,
          height: 768,
        },
      },
    },
  };

  return (
    <div className="flex flex-col justify-between items-center gap-y-4">
      {tokenToUsdMetrics && (
        <div className="mt-8 min-w-[1200px]">
          <p className="text-slate-600 font-medium text-md">
            Switch between full <span className="font-bold">Price History</span> or <span className="font-bold">Market Cap History</span>
          </p>

          <div className="flex justify-center gap-x-2 items-center">
            <button
              className={classNames(
                "px-4 py-2 text-sm font-medium border rounded-lg bg-white focus:z-10 focus:ring-2 hover:bg-blue-700 hover:bg-blue-50 hover:text-white",
                {
                  "border-blue-700 !bg-blue-700 !text-white": viewType === ViewType.PRICE_HISTORY,
                }
              )}
              type="button"
              onClick={() => changeViewType(ViewType.PRICE_HISTORY)}
            >
              Price History
            </button>

            <button
              className={classNames(
                "px-4 py-2 text-sm font-medium border rounded-lg bg-white focus:z-10 focus:ring-2 hover:bg-blue-700 hover:bg-blue-50 hover:text-white",
                {
                  "border-blue-700 !bg-blue-700 !text-white": viewType === ViewType.MARKET_CAP,
                }
              )}
              type="button"
              onClick={() => changeViewType(ViewType.MARKET_CAP)}
            >
              Market Cap
            </button>
          </div>

          <div className="mt-4">
            <HighchartsReact ref={highchartsReactRefObject} highcharts={Highcharts} constructorType={"stockChart"} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryChart;
