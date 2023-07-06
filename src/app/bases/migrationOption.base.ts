export default class {
  columns = [];
  index: number;
  constructor(columns: any[], index: number) {
    this.columns = columns;
    this.index = index;
  }

  isUnsigned() {
    this.columns[this.index]['isUnsigned'] = true;
    return this;
  }

  isNotNull() {
    this.columns[this.index]['isNotNull'] = true;
    return this;
  }

  length(value = 0) {
    this.columns[this.index]['length'] = value;

    return this;
  }

  isNull() {
    this.columns[this.index]['isNotNull'] = false;
    return this;
  }

  isAutoIncrement() {
    this.columns[this.index]['isAutoIncrement'] = true;
    return this;
  }

  isPrimaryKey() {
    this.columns[this.index]['isPrimaryKey'] = true;

    return this;
  }

  comment(value = '') {
    this.columns[this.index]['comment'] = value;

    return this;
  }

  default(value?: any) {
    this.columns[this.index]['isDefault'] = true;
    this.columns[this.index]['defaultValue'] = value;

    return this;
  }
}
