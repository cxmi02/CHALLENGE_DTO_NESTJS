import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TransferService } from '../services/transfer.service';
import { TransferDto } from '../DTOs/common/transfer.dto';
import { Transfer } from '../entity/transfer.entity';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Get()
  findAll(): Promise<Transfer[]> {
    return this.transferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') transferId: string): Promise<Transfer> {
    return this.transferService.findOne(transferId);
  }

  @Post('createTransfer')
  create(@Body() createTransferDto: TransferDto): Promise<Transfer> {
    return this.transferService.create(createTransferDto);
  }

  @Put('updateTransfer/:id')
  update(
    @Param('id') transferId: string,
    @Body() updateTransferDto: TransferDto,
  ): Promise<Transfer> {
    return this.transferService.update(transferId, updateTransferDto);
  }

  @Delete('deleteTransfer:id')
  remove(@Param('id') transferId: string) {
    return this.transferService.remove(transferId);
  }
}
