import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Producer } from 'kafkajs';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AccountsService } from 'src/accounts/accounts.service';
import { TypeStatusEnum } from './interfaces';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer,
    @Inject(AccountsService)
    private readonly accountsService: AccountsService,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const balanceIsValid = await this.accountsService.checkBalance(
      createTransactionDto.accountPayerId,
      createTransactionDto.amount,
    );

    if (!balanceIsValid) {
      throw new Error('Invalid transaction, unavailable balance!');
    }

    const transaction = await this.transactionModel.create({
      accountPayerId: createTransactionDto.accountPayerId,
      accountPayeeId: createTransactionDto.accountPayeeId,
      amount: createTransactionDto.amount,
      date: createTransactionDto.date,
      reason: createTransactionDto.reason,
      status: TypeStatusEnum.InProgress,
    });

    await this.kafkaProducer.send({
      topic: 'topic-transaction',
      messages: [{ key: 'transactions', value: JSON.stringify(transaction) }],
    });

    return transaction;
  }

  findAll() {
    return this.transactionModel.findAll();
  }

  findOne(id: string) {
    return this.transactionModel.findByPk(id, { rejectOnEmpty: true });
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.findOne(id);
    transaction.update({
      accountPayerId: updateTransactionDto.accountPayerId,
      accountPayeeId: updateTransactionDto.accountPayeeId,
      amount: updateTransactionDto.amount,
      date: updateTransactionDto.date,
      reason: updateTransactionDto.reason,
      status: updateTransactionDto.status,
    });
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    user.destroy();
  }
}
