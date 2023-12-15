import { AxiosResponse } from "axios";
import axiosClient from "@/app/utils/axios.config";
import * as endpoints from "@/app/services/endpoints";
import { ExchangeInfo } from "@/app/models/exchange";

export const getTopExchangesByVolume = (): Promise<AxiosResponse<ExchangeInfo>> => {
  return axiosClient.get(endpoints.EXCHANGES_BY_VOLUME);
};

/**
 * In the future, this could be used for displaying a list of exchanges.
 */
export const getExchanges = (exchangeId: string): Promise<AxiosResponse<ExchangeInfo>> => {
  return axiosClient.get(`${endpoints.ALL_EXCHANGES}/${exchangeId}`);
};
