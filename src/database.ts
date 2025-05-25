import dotenv from 'dotenv'
dotenv.config()
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from "./entities/User";
import { Software } from './entities/Software';
import { Request } from './entities/Request';

console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

export const data_source = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Software, Request],
  migrations: ["src/migrations/*.ts"],
  
});
