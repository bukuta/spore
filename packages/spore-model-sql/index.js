var fse = require('fs-extra');
var _ = require('lodash');

var debug = require('debug')('model-sql:test');

async function run(data,targetFile){
  let content = await fse.readFile('src/templates/index.tpl','utf-8');
  let template = _.template(content);
  debug('data',data);
  let r = template(data);
  r = r.split('\n').filter(line=>line.trim().length!==0).join('\n');
  r=`-- 创建${data.table.description}\n`+r+'\n\n'
  debug('sql:',r);
  if(targetFile){
    await fse.ensureFile(targetFile);
    await fse.writeFile(targetFile,r);
  }
  return r;
}

module.exports = {
  run,
};
