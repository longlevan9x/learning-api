import { MigrationInterface, QueryRunner } from 'typeorm';
import MigrationBase from '../bases/migration.base';

export class CreateGrammar1688556358895
  extends MigrationBase
  implements MigrationInterface {
  tableName = 'grammars';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(this.getTableName())) {
      return;
    }
    this.increments();
    this.string('title');
    this.integer('lessonId').isNull();
    this.string('structure').isNull();
    this.string('mean').isNull();
    this.string('explain').isNull();
    await queryRunner.query(this.bindingCreateTable().toSql());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.getTableName());
  }
}
