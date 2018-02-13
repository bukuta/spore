const path = require('path');
const fs = require('fs');
const util = require('util');
const yaml = require('js-yaml');

const Spore = require('../');

const mkdirp = util.promisify(require('mkdirp'));
const debug = require('debug')('test');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const parseYAML = yaml.safeLoad;
const stringifyYAML = yaml.safeDump;

debug(Spore);

async function parseYamlFile(file) {
  let content = await readFile(file, 'utf-8');
  let obj = parseYAML(content);
  return obj;
}

async function test() {
  debug('test');

  const modelfile = path.join(__dirname, './docs/components/schemas/Admin.yaml');
  debug(modelfile);

  let model = await parseYamlFile(modelfile);
  debug(model);
  let name = Object.keys(model)[0].toLowerCase();
  debug(name);
  model = Object.values(model)[0];

  let fields = [
    {
      type: 'selection'
    },
    {
      type: 'index'
    },
    {
      name: 'id',
      label: 'ID'
    },
    {
      name: 'name',
      label: '名字'
    },
    {
      name: 'status',
      label: '状态'
    },
    {
      name: 'updateAt',
      label: '更新时间'
    },
    {
      label: '操作'
    },
  ];

  let searchForm = [
    {
      type: 'select',
      name: 'status',
      label: '状态',
      placeholder: '状态'
    },
    {
      type: 'text',
      name: 'name',
      label: '名字',
      placeholder: '名字'
    },
    {
      type: 'switch',
      name: 'online',
      label: '性别',
      placeholder: '性别'
    },
  ];

  let pagination = {
    layout: "total, prev, pager, next",
    pageSizes: [10, 20, 30, 40],
    pageSize: 10,
  };

  let options = {
    showDetail: {
      route: function route(item) {
        return {
          name: 'adminDetail',
          params: {
            adminId: item.id,
          },
        };
      },
    },
  };

  let content = await Spore.generateListPage({
    name: 'admins',
    model,
    shape: fields,
    path: '/admins',
    searchForm: searchForm,
    pagination,
    options,
  });
  debug('code');
  debug(content);
  let distpath = path.join(__dirname, 'dist', name + 's');
  await mkdirp(distpath)
  await writeFile(path.join(distpath, 'index.vue'), content);

}

test();
