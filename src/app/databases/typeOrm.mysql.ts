import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DB_TYPE,
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PASSWORD,
  MYSQL_PORT,
  MYSQL_USER,
} from '../../environment';
// import { Book } from '../../modules/book/entities/book.entity';

export default TypeOrmModule.forRoot({
  type: DB_TYPE,
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  // entities: [Book],
  // entities: ['dist/**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: true,

  // migrations: ['src/migrations/*.ts', 'dist/migrations/*{.ts,.js}'],
});
