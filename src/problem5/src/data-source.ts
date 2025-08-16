import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Todo } from './entities/todo.entity';
import config from './config';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: config.database.name,
  synchronize: config.database.synchronize,
  logging: config.database.logging,
  entities: [Todo],
});