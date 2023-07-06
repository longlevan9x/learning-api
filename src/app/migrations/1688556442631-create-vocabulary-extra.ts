import { MigrationInterface, QueryRunner } from 'typeorm';
import MigrationBase from '../bases/migration.base';

export class CreateVocabularyExtra1688556442631
  extends MigrationBase
  implements MigrationInterface {
  tableName = 'vocabularyExtras';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(this.getTableName())) {
      return;
    }

    this.increments();
    this.integer('vocabularyId').isNull();
    this.string('word').isNull();
    this.string('mean').isNull();
    this.string('type').isNull();
    await queryRunner.query(this.bindingCreateTable().toSql());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.getTableName());
  }
}
