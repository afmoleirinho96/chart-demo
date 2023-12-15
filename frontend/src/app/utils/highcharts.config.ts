import Highcharts from "highcharts";
import HighchartsStock from "highcharts/highstock";

const timezoneOffset = new Date().getTimezoneOffset();

// Global options for standard Highcharts
Highcharts.setOptions({
  credits: {
    enabled: false,
  },
  time: {
    timezoneOffset,
  },

});

// Global options for Highcharts Stock
HighchartsStock.setOptions({
  credits: {
    enabled: false,
  },
  time: {
    timezoneOffset,
  },

});

export { Highcharts, HighchartsStock };
