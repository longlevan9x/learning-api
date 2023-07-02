import { DataSource } from 'typeorm';
import {
  DB_TYPE,
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER,
} from '../../environment';
import { Book } from '../../modules/book/entities/book.entity';

export default new DataSource({
  type: DB_TYPE,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  entities: [Book],
});
