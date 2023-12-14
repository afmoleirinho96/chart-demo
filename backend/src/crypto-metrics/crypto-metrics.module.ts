import { Module } from '@nestjs/common';

import { CryptoMetricsController } from 'src/crypto-metrics/crypto-metrics.controller';
import { CryptoMetricsService } from 'src/crypto-metrics/crypto-metrics.service';

@Module({
  imports: [],
  controllers: [CryptoMetricsController],
  providers: [CryptoMetricsService]
})
export class CryptoMetricsModule {
}
