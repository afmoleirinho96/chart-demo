import axios from "axios";
import { ConfigService } from "@nestjs/config";

import * as dotenv from "dotenv";

dotenv.config();

const configService = new ConfigService();

const headers = {
  "Content-Type": "application/json",
  "x-cg-pro-api-key": `${configService.get("COINGECKO_API_KEY")}`,
};

const axiosInstance = axios.create({
  headers,
  baseURL: `${configService.get("COINGECKO_BASE_URL")}`,
});

export default axiosInstance;
