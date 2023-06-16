import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account)
    private accountModel: typeof Account,
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return this.accountModel.create({
      userId: createAccountDto.userId,
      balance: createAccountDto.balance,
      bank: createAccountDto.bank,
      agency: createAccountDto.agency,
      account: createAccountDto.account,
      type: createAccountDto.type,
    });
  }

  findAll() {
    return this.accountModel.findAll();
  }

  findOne(id: string) {
    return this.accountModel.findByPk(id, { rejectOnEmpty: true });
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const account = await this.findOne(id);
    account.update({
      userId: updateAccountDto.userId,
      balance: updateAccountDto.balance,
      bank: updateAccountDto.bank,
      agency: updateAccountDto.agency,
      account: updateAccountDto.account,
      type: updateAccountDto.type,
    });

    return account;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    user.destroy();
  }

  async checkBalance(id: string, transactionAmount: number): Promise<boolean> {
    const account = await this.findOne(id);

    let result = false;

    if (account && account.balance >= transactionAmount) {
      result = true;
    }

    return result;
  }
}
