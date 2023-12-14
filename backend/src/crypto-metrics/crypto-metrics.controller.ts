import { Controller, Get, Query } from "@nestjs/common";
import { CryptoMetricsService } from "src/crypto-metrics/crypto-metrics.service";
import { ApiOkResponse, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags("Crypto Metrics")
@Controller("crypto-metrics")
export class CryptoMetricsController {
  constructor(private readonly cryptoMetricsService: CryptoMetricsService) {}

  @Get()
  @ApiOperation({ summary: "Get Token History" })
  @ApiOkResponse({
    description: "Historical data for the specified token:<br>" +
      "<ul>" +
      "<li>Full Price History.</li>" +
      "<li>Full Market Cap History</li>" +
      "</ul>"
  })
  @ApiQuery({
    name: "id",
    description: "The unique identifier of the cryptocurrency/token. " +
      "The list of coins can be found at the endpoint " +
      "<a href='/api/v1/crypto-metrics/coins'>/api/v1/crypto-metrics/coins</a>."
  })
  async getTokenHistory(@Query("id") id: string) {
    return this.cryptoMetricsService.getTokenHistory(id);
  }

  @Get("/coins")
  @ApiOperation({ summary: "Get List of All Tokens" })
  @ApiOkResponse({
    description:
      "Provides a list of all available cryptocurrencies/tokens. " +
      "Use this endpoint to retrieve valid IDs for other queries.",
  })
  async getTokens() {
    return this.cryptoMetricsService.getTokens();
  }

  @Get("/candlestick")
  @ApiOperation({ summary: "Get Token Candlestick Data" })
  @ApiOkResponse({ description: "Candlestick data for the specified token" })
  @ApiQuery({
    name: "id",
    description: "The unique identifier of the cryptocurrency/token. " +
      "The list of coins can be found at the endpoint " +
      "<a href='/api/v1/crypto-metrics/coins'>/api/v1/crypto-metrics/coins</a>."
  })
  async getTokenCandlestickData(@Query("id") id: string) {
    return this.cryptoMetricsService.getTokenCandlestickData(id);
  }
}
