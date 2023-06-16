import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TypeEnum } from '../interfaces';

@Table({
  tableName: 'users',
})
export class User extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ allowNull: false, type: DataType.STRING })
  fullName: string;

  @Column({ allowNull: false, type: DataType.STRING })
  cpfCnpj: string;

  @Column({ allowNull: false, type: DataType.STRING })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;

  @Column({
    allowNull: false,
    type: DataType.ENUM(...Object.values(TypeEnum)),
  })
  type: TypeEnum;
}
