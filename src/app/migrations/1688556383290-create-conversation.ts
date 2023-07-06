import { MigrationInterface, QueryRunner } from 'typeorm';
import MigrationBase from '../bases/migration.base';

export class CreateConversation1688556383290
  extends MigrationBase
  implements MigrationInterface {
  tableName = 'conversations';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(this.getTableName())) {
      return;
    }

    this.increments();
    this.string('title');
    this.integer('lessonId').isNull();
    this.string('image').isNull();
    this.string('audioFile').isNull();
    await queryRunner.query(this.bindingCreateTable().toSql());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.getTableName());
  }
}
