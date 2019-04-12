const path = require('path');
var genSql = require('../').run;

let data = {
  table: {
    name: 'user',
    description: '用户',
    primaryKey: 'id',
  },
  fields: [
    {
      name: 'id',
      type: 'bigint',
      length: 20,
      autoIncrement: true,
      comment: '自增ID',
    },
    {
      name: 'name',
      type: 'varchar',
      length: 64,
      default: "''",
      comment: '用户名',
    },
    {
      name: 'password',
      type: 'varchar',
      length: 20,
      default: "''",
      comment: '密码',
    },
  ],
}

let targetFile = path.join(process.cwd(),`test/dist/${data.table.name}.sql`);

genSql(data,targetFile);

