const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const util = require('util');
const yaml = require('js-yaml');

const debug = require('debug')('spore');
const vue_beautify = require("js-beautify").html
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const listTemplateFile = path.resolve(__dirname, 'templates/list/index.vue');
const listTemplate = readFile(listTemplateFile);

async function generateListPage({name, model, path, shape,searchForm,pagination,options}) {
  let templateContent = await listTemplate;

  let templateFunction = _.template(templateContent);

  let code =  templateFunction({
    name,
    model: model,
    path,
    shape,
    searchForm,
    pagination,
    options,
  });
  return code.split('\n').filter(a=>a.trim()).join('\n');

  let code2 = vue_beautify(code,{});
  return code2;
}


module.exports = {
  generateListPage
};
