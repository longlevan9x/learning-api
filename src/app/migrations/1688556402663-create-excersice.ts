import { MigrationInterface, QueryRunner } from 'typeorm';
import MigrationBase from '../bases/migration.base';

export class CreateExcersice1688556402663
  extends MigrationBase
  implements MigrationInterface {
  tableName = 'exercises';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(this.getTableName())) {
      return;
    }

    this.increments();
    this.integer('lessonId').isNull();
    this.string('image').isNull();
    this.string('audioFile').isNull();
    this.string('type').isNull().comment('listening, reading, grammar');
    await queryRunner.query(this.bindingCreateTable().toSql());
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.getTableName());
  }
}
