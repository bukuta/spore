const path = require('path');
var genModel = require('../').run;

let data = {
  modelName: 'Project',
  schema: {
    description: '项目',
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
        description: '名称',
        placeholder: 'tom',
        aliasFor: 'nickName',
      },
      description: {
        type: 'string',
        length: 256,
        description: '说明',
      },
    },
  },
  schemas: {
    Scenario:{
      description: '剧本',
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
          description: '名称',
          placeholder: 'tom',
          aliasFor: 'nickName',
        },
        description: {
          type: 'string',
          length: 256,
          description: '说明',
        },
      },
    },
    Variable: {
      description: '变量',
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
          description: '变量名',
        },
        description: {
          type: 'string',
          length: 256,
          description: '说明',
        },
      },
    },
  },

  paths: {
  },
}

let paths = [];
paths = [
  ...paths,
  `${data.modelName}.js`,
];

let targetFile = path.join(process.cwd(), `test/dist/${paths.join('/')}`);

genModel(data, targetFile);


/projects:    collection
    methods:
      get: list
      post: 201

    subpaths:
      /:projectId:   model
        methods:
          get:
          patch:
          delete:

        subpaths:
          /status:   rpc
            methods:
              get
              put:

          /publish: rpc
            methods:
              post:

          /scenarios:   collection
            methods:
              get:
              post:
          /variables:  collection
            methods:
              get:
              post:



