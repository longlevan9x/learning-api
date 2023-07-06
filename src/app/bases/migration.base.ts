import MigrationOptionBase from './migrationOption.base';

export default abstract class MigrationBase {
  tableName = '';

  sql = '';
  columns = [];
  getTableName(): string {
    if (this.tableName === '') {
      throw new Error('tableName is not empty');
    }

    return this.tableName;
  }

  primaryKeyIncrement() {
    this.integer('id');

    const option = this._newOption();
    option.isAutoIncrement();
    option.isUnsigned();
    option.isNotNull();
    option.isPrimaryKey();

    return option;
  }

  increments(name = 'id') {
    this.integer(name);

    const option = this._newOption();
    option.isAutoIncrement();
    option.isUnsigned();
    option.isNotNull();
    option.isPrimaryKey();

    return option;
  }

  integer(name: string) {
    this.columns.push({ name: name, type: 'int' });

    return this._newOption();
  }

  biginteger(name: string) {
    this.columns.push({ name: name, type: 'bigint' });

    return this._newOption();
  }

  tinyint(name: string) {
    this.columns.push({ name: name, type: 'tinyint' });

    return this._newOption();
  }

  string(name: string, length = 255) {
    this.columns.push({ name: name, type: 'string', length });

    return this._newOption();
  }

  protected _newOption() {
    return new MigrationOptionBase(this.columns, this.columns.length - 1);
  }

  bindingCreateTable() {
    let sql = `CREATE TABLE \`${this.getTableName()}\` (`;

    const columnPrimaryKeys = [];

    for (const column of this.columns) {
      const type = this._getTypeColumn(column);
      const isNotNull = !column.isNotNull ? '' : 'NOT NULL';
      const isAutoIncrement = column.isAutoIncrement ? 'AUTO_INCREMENT' : '';
      const comment = column.comment ? `COMMENT '${column.comment}'` : '';
      const isUnsigned = column.isUnsigned ? 'UNSIGNED' : '';
      const defaultValue = column.isDefault
        ? `DEFAULT ${column.defaultValue}`
        : '';

      sql += `\`${column.name}\` ${type} ${isUnsigned} ${isNotNull} ${isAutoIncrement} ${defaultValue} ${comment}, `;

      if (column.isPrimaryKey) {
        columnPrimaryKeys.push(column.name);
      }
    }

    if (columnPrimaryKeys.length) {
      sql += `PRIMARY KEY (\`${columnPrimaryKeys.join(',')}\`)`;
    }

    sql += `)  ENGINE=InnoDB`;

    this.sql = sql;

    return this;
  }

  bindingDropTable() {
    this.sql = `DROP TABLE \`${this.getTableName()}\``;
    return this;
  }

  public toSql() {
    return this.sql;
  }

  protected _getTypeColumn(column) {
    let type = '';

    switch (column.type) {
      case 'int':
        type = 'int';
        break;
      case 'bigint':
        type = 'bigint';
        break;
      case 'tinyint':
        type = 'tinyint';
        break;
      case 'string':
        type = `varchar(${column.length})`;
        break;
      default:
        break;
    }

    return type;
  }
}
