import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account)
    private accountModel: typeof Account,
    private readonly usersService: UsersService,
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

  async findOneByCpfCnpj(cpfCnpj: string) {
    const { id: userId } = await this.usersService.findOneByCpfCnpj(cpfCnpj);
    if (!userId) throw new Error('User not found!');

    console.log('userId', userId);
    return this.accountModel.findOne({
      where: {
        userId,
      },
    });
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
