"use client";
import { CryptocurrencyProvider } from "@/app/contexts/cryptocurrency.context";
import ChartWrapper from "@/app/pages/chart-wrapper/chart-wrapper";
import { ThemeProvider } from "@/app/contexts/theme.context";
import React, { FC } from "react";
import "./utils/highcharts.config";

const Home: FC = () => {
  return (
    <div className="bg-stone-200 min-h-screen flex flex-col items-center justify-between p-4 md:p-12 lg:p-18 xl:p-24">
      <ThemeProvider>
        <CryptocurrencyProvider>
          <ChartWrapper />
        </CryptocurrencyProvider>
      </ThemeProvider>
    </div>
  );
};

export default Home;
