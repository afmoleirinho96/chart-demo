"use client";

import React, { useEffect, useState } from "react";
import LineChart from "@/app/pages/chart-wrapper/line-chart/line-chart";
import StockChart from "@/app/pages/chart-wrapper/stock-chart/stock-chart";
import SunburstChart from "@/app/pages/chart-wrapper/sunburst-chart/sunburst-chart";
import Highcharts from "highcharts/highcharts";
import DarkUnica from "highcharts/themes/dark-unica";
import SandSignika from "highcharts/themes/sand-signika";
import Avocado from "highcharts/themes/avocado";
import BrandDark from "highcharts/themes/brand-dark";
import BrandLight from "highcharts/themes/brand-light";
import { useTheme } from "@/app/contexts/theme.context";
import ExchangesChart from "@/app/pages/chart-wrapper/exchanges-chart/exchanges-chart";
import HC_more from "highcharts/highcharts-more";
import HC_exporting from "highcharts/modules/exporting";
import stockInit from "highcharts/modules/stock";
import CryptoMetrics from "@/app/pages/chart-wrapper/crypto-metrics/crypto-metrics";
import classNames from "classnames";

enum ChartType {
  LineChart = "Line Chart",
  StockChart = "Stock Chart",
  SunburstChart = "Sunburst Chart",
  MultiSeries = "Multi Series Chart",
}

// Initialize modules
if (typeof Highcharts === "object") {
  HC_more(Highcharts);
  stockInit(Highcharts);
  HC_exporting(Highcharts);
}

export const themes = {
  dark: DarkUnica,
  sand: SandSignika,
  avocado: Avocado,
  brandDark: BrandDark,
  brandLight: BrandLight,
  // Add more themes here
};

export type ThemeName = "dark" | "sand" | "avocado" | "brandDark";

const ChartWrapper = () => {
  const [themeReady, setThemeReady] = useState(false);
  const { theme, setTheme } = useTheme();
  const [showCryptoCharts, setShowCryptoCharts] = useState(false);

  useEffect(() => {
    const themeModule = themes[theme as ThemeName];
    themeModule(Highcharts);
    setThemeReady(true);
  }, [theme]);

  const changeTheme = (newTheme: ThemeName) => {
    setTheme(newTheme);
    setThemeReady(false);
  };

  const [existingCharts, setExistingCharts] = useState<Record<ChartType, boolean>>({
    [ChartType.LineChart]: false,
    [ChartType.StockChart]: false,
    [ChartType.SunburstChart]: false,
    [ChartType.MultiSeries]: false,
  });

  const charts = [
    { type: ChartType.LineChart, component: <LineChart theme={theme as ThemeName} /> },
    { type: ChartType.StockChart, component: <StockChart /> },
    { type: ChartType.SunburstChart, component: <SunburstChart /> },
  ];

  const toggleChart = (chartType: ChartType) => {
    setExistingCharts((prev) => ({ ...prev, [chartType]: !prev[chartType] }));
  };

  return (
    <div className="flex w-full flex-col gap-y-10">
      <div className="w-full">
        <select className="flex items-start" value={theme} onChange={(e) => changeTheme(e.target.value as ThemeName)}>
          {Object.keys(themes).map((theme) => (
            <option className="text-black" key={theme} value={theme}>
              {theme}
            </option>
          ))}
        </select>

        {themeReady &&
          charts.map(({ type, component }) => (
            <div key={type}>
              <div className="flex justify-center mb-4">
                <button className="bg-blue-300 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded" onClick={() => toggleChart(type)}>
                  <p>{existingCharts[type] ? `Hide ${type} Chart` : `Show ${type}`}</p>
                </button>
              </div>

              <div className="flex w-full">{existingCharts[type] && component}</div>
            </div>
          ))}
      </div>

      <hr className="border-0 border-b-[3px] border-double bg-slate-900 flex-grow" />

      <div className="flex flex-col place-items-center gap-y-4">
        <p className="text-xl font-semibold text-sky-900">Crypto Charts</p>

        <button
          className="bg-blue-300 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded"
          type="button"
          onClick={() => setShowCryptoCharts(!showCryptoCharts)}
        >
          {showCryptoCharts ? "Hide" : "Show"} Charts
        </button>

        {
          <div className={classNames(
            "flex flex-col gap-y-4 justify-center items-center",
            {
              "invisible": !showCryptoCharts,
              "visible": showCryptoCharts,
            }
          )}>
            <CryptoMetrics />
            <ExchangesChart />
          </div>
        }
      </div>
    </div>
  );
};

export default ChartWrapper;
