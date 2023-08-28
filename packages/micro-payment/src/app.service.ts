import { Inject, Injectable } from '@nestjs/common';
import { Producer } from 'kafkajs';
import { InjectModel } from '@nestjs/sequelize';
import axios from 'axios';
import { Sequelize } from 'sequelize-typescript';

import { AUTHORIZED, BASE_URL } from './utils/constants';
import { Transaction, Account, User } from './shared/entities';
import { TypeStatusEnum } from './shared/interfaces';
import { TransactionSuccessDto } from './dto/payment-success.dto';
import { EmailService } from './email/email.service';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Transaction)
    private transactionModel: typeof Transaction,
    @InjectModel(Account)
    private accountModel: typeof Account,
    @InjectModel(User)
    private userModel: typeof User,
    private readonly sequelize: Sequelize,
    private readonly emailService: EmailService,
    @Inject('KAFKA_PRODUCER')
    private kafkaProducer: Producer,
  ) {}

  findOneTransaction(id: string) {
    return this.transactionModel.findByPk(id, { rejectOnEmpty: true });
  }

  findOneAccount(id: string) {
    return this.accountModel.findByPk(id, { rejectOnEmpty: true });
  }

  findOneUser(id: string) {
    return this.userModel.findByPk(id, { rejectOnEmpty: true });
  }

  async updateTransaction(id: string, status: TypeStatusEnum) {
    const transaction = await this.findOneTransaction(id);

    transaction.update({ status });
  }

  async updateAccount(id: string, amount: number) {
    const account = await this.findOneAccount(id);
    console.log('account', account);

    account.update({ balance: account.balance + amount });
  }

  async updateAccountsAndTransaction(
    transactionId: string,
    accountPayerId: string,
    accountPayeeId: string,
    amount: number,
  ) {
    await this.updateTransaction(transactionId, TypeStatusEnum.Accepted);

    await this.updateAccount(accountPayerId, -amount);
    await this.updateAccount(accountPayeeId, +amount);
  }

  async sendEmailToPayee(accountPayeeId: string, amount: number) {
    // FIXME: add another service to send email or sms
    // const resultSuccess = {
    //   accountPayeeId,
    //   amount,
    // };
    // await this.kafkaProducer.send({
    //   topic: 'topic-notification',
    //   messages: [{ key: 'notifications', value: JSON.stringify(resultSuccess) }],
    // });

    const account = await this.findOneAccount(accountPayeeId);
    const user = await this.findOneUser(account.userId);

    const to = `${user.email}`;
    console.log('to', user.email);
    const subject = 'MiniBank | Transaction';
    const body = `You owner of the account ${account.account} received the amount ${amount} in a transaction.`;

    try {
      await this.emailService.sendEmail(to, subject, body);
    } catch (error) {
      throw new Error(`Error on send email! ${error}`);
    }
  }

  async processTransaction(body: TransactionSuccessDto) {
    const bodyStringify = JSON.stringify(body);
    const bodyTransaction = JSON.parse(bodyStringify);
    console.log(`Topic transaction, body: ${bodyTransaction.id}`);

    await axios
      .get(`${BASE_URL}`)
      .then(async (response) => {
        if (response.status !== 200) {
          throw new Error('Network response was not OK');
        }

        const { message } = response.data;
        if (message.toLowerCase() === AUTHORIZED.toLowerCase()) {
          let transaction;
          try {
            transaction = await this.sequelize.transaction();

            await this.updateAccountsAndTransaction(
              bodyTransaction.id,
              bodyTransaction.accountPayerId,
              bodyTransaction.accountPayeeId,
              bodyTransaction.amount,
            );

            await transaction.commit();

            await this.sendEmailToPayee(
              bodyTransaction.accountPayeeId,
              bodyTransaction.amount,
            );
          } catch (err) {
            if (transaction) await transaction.rollback();
            throw new Error(`Error on update information: ${err}`);
          }
        } else {
          throw new Error('Unauthorized payment transaction process!');
        }
      })
      .catch(async (err) => {
        await this.updateTransaction(
          bodyTransaction.accountPayerId,
          TypeStatusEnum.InProgress,
        );
        throw new Error(`Error on authorized process: ${err}`);
      });
  }
}
