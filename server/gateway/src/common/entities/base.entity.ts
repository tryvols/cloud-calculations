import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ColumnOptions } from "typeorm";

const timestampConfig: ColumnOptions = {
  precision: null,
  type: "timestamp",
  default: () => "CURRENT_TIMESTAMP",
};

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn(timestampConfig)
  createdAt: Date;

  @UpdateDateColumn(timestampConfig)
  updatedAt: Date;
}