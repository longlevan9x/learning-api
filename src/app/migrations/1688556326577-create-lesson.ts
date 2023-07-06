import { MigrationInterface, QueryRunner } from 'typeorm';
import MigrationBase from '../bases/migration.base';

export class CreateLesson1688556326577
  extends MigrationBase
  implements MigrationInterface {
  tableName = 'lessons';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(this.getTableName())) {
      return;
    }

    this.increments('id');
    this.string('name').isNotNull();
    this.integer('categoryId').isNull();
    this.tinyint('isActive').isNotNull().default(1);
    this.string('cloneUrl').isNull();
    this.string('audioFile').isNull();

    await queryRunner.query(this.bindingCreateTable().toSql());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.bindingDropTable().toSql());
  }
}
