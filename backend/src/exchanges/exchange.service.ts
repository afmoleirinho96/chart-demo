import axiosInstance from "src/utils/http/axios.config";
import { Injectable } from "@nestjs/common";
import { ExchangeInfo, ExchangeVolumeData } from "src/models/exchange";

@Injectable()
export class ExchangeService {
  async getTopExchangesByVolume(): Promise<ExchangeVolumeData> {

    /**
     * TODO - Improve the mechanism to know how many exchanges exist beforehand, so there's no need to hardcode pages.
     */
    const urls = [
      "exchanges?per_page=250&page=1",
      "exchanges?per_page=250&page=2",
      "exchanges?per_page=250&page=3",
    ];

    const results = await Promise.all(urls.map((url) => axiosInstance.get<ExchangeInfo[]>(url)));

    const exchangesInfo: ExchangeInfo[] = results.flatMap((response) => response.data);

    const sortedExchanges = exchangesInfo
      .sort((a, b) => b.trade_volume_24h_btc - a.trade_volume_24h_btc)
      .slice(0, 20);

    return { results: sortedExchanges, count: exchangesInfo.length };
  }

  async getExchanges(): Promise<ExchangeInfo[]> {
    const response = await axiosInstance.get<ExchangeInfo[]>("exchanges");
    return response.data;
  }
}
