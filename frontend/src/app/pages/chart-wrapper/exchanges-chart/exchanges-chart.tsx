//@ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import { getTopExchangesByVolume } from "@/app/services/exchanges/exchanges.service";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import { ExchangeInfo } from "@/app/models/exchange";

interface ExchangesBtcVolume {
  topExchangesByVolume: ExchangeInfo[];
  count: number;
}

const ExchangesChart = () => {
  const [exchanges, setExchanges] = useState<ExchangesBtcVolume>([]);

  useEffect(() => {
    const getExchangesInfo = async () => {
      const { data } = await getTopExchangesByVolume();

      const formattedData = data.results.map((exchange: any) => {
        return {
          name: exchange.name,
          y: exchange.trade_volume_24h_btc_normalized,
          image: exchange.image,
          year: exchange.year_established,
        };
      });
      setExchanges({ topExchangesByVolume: formattedData, count: data.count });
    };

    getExchangesInfo();
  }, []);

  return (
    exchanges?.count && (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            chart: {
              type: "pie",
              width: 500,
              height: 500,
              backgroundColor: "transparent",
            },
            title: {
              text: "Total 24-Hour BTC Trading Volume by top 20 Exchange"
            },
            subtitle: {
              useHTML: true,
              text: `<p style="display: flex; flex-direction: column; align-items: center; font-size: 10px; font-weight: 700">
                    <br/>
                    <b style="margin-top:16px; font-size: 18px; color:rgba(19,103,38,0.75); font-weight:700">${(
                      exchanges.topExchangesByVolume.reduce((acc, exchange) => acc + exchange.y, 0) / 1e6
                    ).toFixed(2)} Million</b>
                  </p>`,
              floating: true,
              verticalAlign: "middle",
              y: 30,
            },
            tooltip: {
              useHTML: true,
              formatter: function () {
                const valueInThousands = (this.point.y / 1e3).toFixed(2);
                let yearInfo = this.point.year
                  ? `<p style="text-align: end; font-size:10px; color:#9b9797; font-style:italic;">Since ${this.point.year}</p>`
                  : "";

                return `<div style="display:flex; flex-direction: column; justify-content: space-between; min-width: 100px; font-size: 14px;">
              <div style="display:flex; align-items: center; gap: 4px;">
                <img alt="Exchange with last 24h trading volume in BTC" src="${this.point.options.image}" style="width: 24px; height: auto; border:1px solid gray; border-radius: 16px;"> 
                <p style="text-wrap:wrap; padding-right:4px;">${this.point.name}</p>
              </div>
              <div style="display:flex; flex-direction:column; gap:12px; margin-top:8px;">
                <b style="margin-top:4px;">${valueInThousands} K</b>
                ${yearInfo}
              </div>
            </div>`;
              },
              borderRadius: 4,
              padding: 10,
            },
            legend: {
              enabled: true,
            },
            plotOptions: {
              series: {
                borderWidth: 0,
                type: "pie",
                size: 450,
                innerSize: "80%",
                dataLabels: {
                  enabled: false,
                  crop: false,
                },
              },
            },
            series: [
              {
                data: exchanges.topExchangesByVolume,
              },
            ],
          }}
        />
        <div className="flex flex-col items-center justify-center gap-y-2">
          <p className="italic opacity tracking-[0.5px] text-slate-600 font-medium text-md">Displaying top 20 exchanges by 24-hour trading volume</p>
          <p className="text-xs font-semibold text-center">
            Number of exchanges analyzed: <span className="font-normal">{exchanges.count}</span>
          </p>
        </div>
      </div>
    )
  );
};
export default ExchangesChart;
