import { MigrationInterface, QueryRunner } from 'typeorm';
import MigrationBase from '../bases/migration.base';

export class CreateKanji1688556338982
  extends MigrationBase
  implements MigrationInterface {
  tableName = 'kanjis';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(this.getTableName())) {
      return;
    }

    this.increments();
    this.string('name');
    this.integer('lessonId').isNull();
    this.string('vocabulary').isNull();
    this.string('kanji').isNull();
    this.string('vietnamSound').isNull();
    this.string('mean').isNull();
    this.string('image').isNull();
    await queryRunner.query(this.bindingCreateTable().toSql());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.getTableName());
  }
}
