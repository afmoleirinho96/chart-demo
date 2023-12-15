import { AxiosResponse } from "axios";
import axiosClient from "@/app/utils/axios.config";
import * as endpoints from "@/app/services/endpoints";
import { Token } from "@/app/models/crypto-metrics";

export const getTokenHistory = (id: string): Promise<AxiosResponse<any>> => {
  return axiosClient.get(endpoints.TOKEN_HISTORY, { params: { id } });
};

export const getTokens = (): Promise<AxiosResponse<Token[]>> => {
  return axiosClient.get(endpoints.ALL_TOKENS);
};

export const getCandlestickData = (id: string = "bitcoin"): Promise<AxiosResponse<any>> => {
  return axiosClient.get(endpoints.TOKEN_CANDLESTICK_HISTORY, { params: { id } });
};
