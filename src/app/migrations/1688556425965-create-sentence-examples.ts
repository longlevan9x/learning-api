import { MigrationInterface, QueryRunner } from 'typeorm';
import MigrationBase from '../bases/migration.base';

export class CreateSentenceExamples1688556425965
  extends MigrationBase
  implements MigrationInterface {
  tableName = 'exampleSentences';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(this.getTableName())) {
      return;
    }

    this.increments();
    this.integer('referenceId').isNull();
    this.string('referenceType')
      .isNull()
      .comment('vocabulary, grammar, practice');
    this.string('sentence').isNull();
    this.string('mean').isNull();
    await queryRunner.query(this.bindingCreateTable().toSql());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.getTableName());
  }
}
