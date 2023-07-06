import { MigrationInterface, QueryRunner } from 'typeorm';
import MigrationBase from '../bases/migration.base';

export class CreateVocabulary1688556345734
  extends MigrationBase
  implements MigrationInterface {
  tableName = 'vocabularies';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(this.getTableName())) {
      return;
    }

    this.increments();
    this.string('name');
    this.integer('referenceId').isNull();
    this.string('referenceType').isNull().comment('lesson, kanji...');
    this.string('kanji').isNull();
    this.string('vietnamSound').isNull();
    this.string('audioFile').isNull();
    this.string('mean').isNull();
    this.string('caption').isNull();
    this.string('wordType').isNull();
    this.string('type').isNull();
    await queryRunner.query(this.bindingCreateTable().toSql());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.getTableName());
  }
}
