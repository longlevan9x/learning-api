import { MigrationInterface, QueryRunner } from 'typeorm';
import MigrationBase from '../bases/migration.base';

export class CreatePractice1688556392559
  extends MigrationBase
  implements MigrationInterface {
  tableName = 'practices';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(this.getTableName())) {
      return;
    }

    this.increments();
    this.string('title');
    this.integer('lessonId').isNull();
    this.string('image').isNull();
    this.string('audioFile').isNull();
    this.string('practiceType').isNull().comment('reading, listening');
    this.string('type').isNull().comment('sample, example');
    await queryRunner.query(this.bindingCreateTable().toSql());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.getTableName());
  }
}
