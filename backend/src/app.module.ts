import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { ConfigModule } from '@nestjs/config';

import { AppService } from 'src/app.service';
import { CryptoMetricsModule } from 'src/crypto-metrics/crypto-metrics.module';
import { ExchangeModule } from 'src/exchange/exchange.module';
import { CoinGeckoExceptionFilter } from "src/filters/exception.filter";
import { APP_FILTER } from "@nestjs/core";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		ExchangeModule,
		CryptoMetricsModule
	],
	controllers: [AppController],
	providers: [AppService,  {
		provide: APP_FILTER,
		useClass: CoinGeckoExceptionFilter,
	},],
})
export class AppModule {
}
