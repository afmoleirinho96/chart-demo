import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ExchangeService } from "src/exchanges/exchange.service";
import { ExchangeInfo, ExchangeVolumeData } from "src/models/exchange";

@ApiTags("Exchanges")
@Controller("exchanges")
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  /**
   * Not used for now
   * However it's available as it could be interesting to have a raw list of exchanges
   */
  @Get()
  @ApiOperation({ summary: "Get All Exchanges" })
  @ApiOkResponse({ description: "Complete list of exchanges" })
  async getExchanges(): Promise<ExchangeInfo[]> {
    return this.exchangeService.getExchanges();
  }

  @Get("/top-volume")
  @ApiOperation({ summary: "Get Top 20 Exchanges by Trading Volume in the last 24h, in BTC" })
  @ApiOkResponse({ description: "List of top 20 exchanges sorted by trading volume, in BTC" })
  async getTopExchangesByVolume(): Promise<ExchangeVolumeData> {
    return this.exchangeService.getTopExchangesByVolume();
  }
}
