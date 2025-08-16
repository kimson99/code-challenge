import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum TodoPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({type: "varchar"})
  title!: string;

  @Column({ nullable: true, type: "varchar" })
  description!: string | null;

  @Column({ default: false, type: "boolean" })
  completed!: boolean;

  @Column({
    type: 'varchar',
    enum: TodoPriority,
    default: TodoPriority.MEDIUM
  })
  priority!: TodoPriority;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}