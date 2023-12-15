import { Injectable, NotFoundException } from "@nestjs/common";
import axiosInstance from "src/utils/axios.config";

@Injectable()
export class CryptoMetricsService {
  async getTokenHistory(id: string) {
    if (!id) {
      throw new NotFoundException(`Token with id ${id} not found!`);
    }

    const response = await axiosInstance.get(`coins/${id}/market_chart`, {
      params: { vs_currency: "usd", days: "max" },
    });
    return response.data;
  }

  async getTokens() {
    const response = await axiosInstance.get(`coins/list`);
    return response.data;
  }

  async getTokenCandlestickData(id: string) {
    if (!id) {
      throw new NotFoundException(`Token with id ${id} not found!`);
    }
    const response = await axiosInstance.get(`coins/${id}/ohlc`, {
      params: { vs_currency: "usd", days: "180" },
    });
    return response.data;
  }
}
