import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create({
      fullName: createUserDto.fullName,
      cpfCnpj: createUserDto.cpfCnpj,
      email: createUserDto.email,
      password: createUserDto.password,
      type: createUserDto.type,
    });
  }

  findAll() {
    return this.userModel.findAll();
  }

  findOne(id: string) {
    return this.userModel.findByPk(id, { rejectOnEmpty: true });
  }

  findOneByCpfCnpj(cpfCnpj: string) {
    return this.userModel.findOne({
      where: {
        cpfCnpj,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    user.update({
      fullName: updateUserDto.fullName,
      cpfCnpj: updateUserDto.cpfCnpj,
      email: updateUserDto.email,
      password: updateUserDto.password,
      type: updateUserDto.type,
    });

    return user;
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    user.destroy();
  }
}
