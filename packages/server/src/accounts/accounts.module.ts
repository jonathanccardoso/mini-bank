import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Account } from './entities/account.entity';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [SequelizeModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService, UsersService],
  exports: [AccountsService],
})
export class AccountsModule {}
