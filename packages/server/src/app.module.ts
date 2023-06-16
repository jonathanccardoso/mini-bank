import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AccountsModule } from './accounts/accounts.module';
import { User } from './users/entities/user.entity';
import { Account } from './accounts/entities/account.entity';
import { Transaction } from './transactions/entities/transaction.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'db_mini_bank',
      models: [User, Account, Transaction],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    TransactionsModule,
    AccountsModule,
  ], // register others modules
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
