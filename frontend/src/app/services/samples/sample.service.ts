import { AxiosResponse } from "axios";
import axiosClient from "@/app/utils/axios.config";

/**
 * Utilized to showcase HighCharts Stock type with highcharts data
 */
export const getSampleData = (): Promise<AxiosResponse<any>> => {
  return axiosClient.get("https://www.highcharts.com/samples/data/usdeur.json");
};
