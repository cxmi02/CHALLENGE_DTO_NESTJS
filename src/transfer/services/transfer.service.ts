import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransferDto } from '../DTOs/common/transfer.dto';
import { Transfer } from '../entity/transfer.entity';

@Injectable()
export class TransferService {
  constructor(
    @InjectModel(Transfer.name) protected transferModel: Model<Transfer>,
  ) {}

  private transfers: Transfer[] = []; // Simulated in-memory database

  async findAll(): Promise<Transfer[]> {
    return await this.transferModel.find().exec();
  }

  async findOne(transferId: string): Promise<Transfer> {
    const transfer = await this.transferModel.findOne({ transferId }).exec();
    if (!transfer) {
      throw new NotFoundException(`Transfer with ID ${transferId} not found`);
    }
    return transfer;
  }

  async create(createTransferDto: TransferDto): Promise<Transfer> {
    const existingTransfer = await this.transferModel
      .findOne({ transferId: createTransferDto.transferId })
      .exec();
    if (existingTransfer) {
      throw new HttpException(
        `Transfer whith id ${createTransferDto.transferId} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const newTransfer = new this.transferModel(createTransferDto);
    return await newTransfer.save();
  }

  async update(id: string, updateTransferDto: TransferDto): Promise<Transfer> {
    const updateTransfer = await this.transferModel
      .findOneAndUpdate({ transferId: id }, updateTransferDto, { new: true })
      .exec();
    if (!updateTransfer) {
      throw new HttpException(
        `Transfer with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return updateTransfer;
  }

  async remove(id: string): Promise<void> {
    const deletedBook = await this.transferModel
      .findOneAndDelete({ transferId: id })
      .exec();
    if (!deletedBook) {
      throw new HttpException(
        `Transfer with id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  private generateId(): number {
    return this.transfers.length > 0
      ? Math.max(...this.transfers.map((t) => t.id)) + 1
      : 1;
  }
}
