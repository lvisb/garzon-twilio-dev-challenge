import { Global, Module } from '@nestjs/common'
import { DailySummaryService } from './daily-summary.service.js'

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [DailySummaryService],
  exports: [DailySummaryService],
})
export class DailySummaryModule {}
