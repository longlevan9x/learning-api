import { MigrationInterface, QueryRunner } from 'typeorm';
import MigrationBase from '../bases/migration.base';

export class CreateLesson1688556326577
  extends MigrationBase
  implements MigrationInterface
{
  tableName = 'lessons';

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(
      `CREATE TABLE \`${this.getTableName()}\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`categoryId\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`cloneUrl\` varchar(255) NOT NULL, \`audioFile\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`${this.getTableName()}\``);
  }
}
