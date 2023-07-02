import * as dotenv from 'dotenv';
dotenv.config();

export const DB_TYPE = (process.env.DB_TYPE as any) || 'mysql';
export const MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'test';
export const MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
export const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || '';
export const MYSQL_PORT = parseInt(process.env.MYSQL_PORT) || 3306;
export const MYSQL_USER = process.env.MYSQL_USER || 'root';
