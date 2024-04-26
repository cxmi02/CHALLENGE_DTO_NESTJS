import { Module } from '@nestjs/common';
import { TransferController } from './controllers/transfer.controller';
import { TransferService } from './services/transfer.service';

@Module({
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
