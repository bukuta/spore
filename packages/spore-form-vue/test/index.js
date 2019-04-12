const path = require('path');
var genForm = require('../').run;

let data = {
  modelName: 'User',
  schema: {
    properties: {
      name: {
        type: 'string',
        length: 64,
        description: '用户名',
        placeholder: 'tom',
      },
      password: {
        type: 'string',
        length: 20,
        description: '密码',
        placeholder: "******"
      },
    },
  },
  rules: {
    name: [
      {
        required: true,
        message: '必填',
        trigger: 'blur',
      },
      {
        min: 2,
        max: 20,
      },
    ],
    password: [
      '$rules.required',
      '$rules.length(2,10)',
    ],
  },
  boneData: {
    name: '',
    password: '',
  },
}

let targetFile = path.join(process.cwd(), `test/dist/${data.modelName.toLowerCase()}.vue`);

genForm(data, targetFile);
