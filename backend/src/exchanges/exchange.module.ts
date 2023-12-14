import { Module } from '@nestjs/common';
import { ExchangeService } from 'src/exchanges/exchange.service';
import { ExchangeController } from 'src/exchanges/exchange.controller';

@Module({
  imports: [],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}
