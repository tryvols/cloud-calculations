import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ColumnOptions
} from "typeorm";

const timestampConfig: ColumnOptions = {
  precision: null,
  type: "timestamp",
  default: () => "CURRENT_TIMESTAMP",
};

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn(timestampConfig)
  createdAt: Date;

  @UpdateDateColumn(timestampConfig)
  updatedAt: Date;

  @Column()
  userId: string;

  @Column()
  token: string;
}