import { MigrationInterface, QueryRunner } from 'typeorm';
import MigrationBase from '../bases/migration.base';

export class CreateCategory1688556312765
  extends MigrationBase
  implements MigrationInterface {
  tableName = 'categories';

  public async up(queryRunner: QueryRunner): Promise<void> {
    if (await queryRunner.hasTable(this.getTableName())) {
      return;
    }

    this.integer('id').isAutoIncrement().isNotNull().isPrimaryKey();

    this.string('name', 255).isNotNull();
    this.tinyint('isActive').isNotNull().default(1);
    this.string('cloneUrl').isNull();
    const sql = this.bindingCreateTable().toSql();

    await queryRunner.query(sql);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.bindingDropTable().toSql());
  }
}
