import Highcharts from "highcharts";
import HighchartsStock from "highcharts/highstock";

const timezoneOffset = new Date().getTimezoneOffset();

// Global options for standard Highcharts - if is needed due to Next.js known problem with Highcharts
if (typeof Highcharts === "object") {
  Highcharts.setOptions({
    credits: {
      enabled: false,
    },
    time: {
      timezoneOffset,
    },
  });
}
// Global options for Highcharts Stock - if is needed due to Next.js known problem with Highcharts
if (typeof HighchartsStock === "object") {
  HighchartsStock.setOptions({
    credits: {
      enabled: false,
    },
    time: {
      timezoneOffset,
    },

  });
}


export { Highcharts, HighchartsStock };
