import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { CryptoMetricsModule } from "src/crypto-metrics/crypto-metrics.module";
import { ExchangeModule } from "src/exchanges/exchange.module";
import { CoinGeckoExceptionFilter } from "src/filters/exception.filter";
import { APP_FILTER } from "@nestjs/core";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ExchangeModule, CryptoMetricsModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CoinGeckoExceptionFilter,
    },
  ],
})
export class AppModule {}
