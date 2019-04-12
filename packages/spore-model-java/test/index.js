const path = require('path');
var genModel = require('../').run;

let data = {
  package: 'com.bukuta.helloworld'+'.models',
  modelName: 'User',
  table:{
    name: 'user',
  },
  schema: {
    properties: {
      id: {
        type: 'integer',
        length: 64,
        required: true,
        primaryKey: true,
        description: 'ID',
        placeholder: 'tom',
      },
      name: {
        type: 'string',
        required: true,
        length: 64,
        description: '用户名',
        placeholder: 'tom',
        aliasFor: 'nickName',
      },
      password: {
        type: 'string',
        length: 20,
        description: '密码',
        placeholder: "******"
      },
    },
  },
}

let paths = data.package.split('.');
paths = [
  ...paths,
  `${data.modelName}.java`,
];

let targetFile = path.join(process.cwd(), `test/dist/${paths.join('/')}`);

genModel(data, targetFile);
