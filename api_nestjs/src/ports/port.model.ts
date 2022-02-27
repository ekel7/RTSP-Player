/* eslint-disable prettier/prettier */
import { AutoIncrement, Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'ports'
})
export class Port extends Model {
  @Column
  number: number;

  @Column
  user: string;

  @Column
  pid: number;

  @Column({
    primaryKey: true,
    autoIncrement: true
  })
  id: string;
}
