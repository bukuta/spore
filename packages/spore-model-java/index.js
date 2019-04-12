var fse = require('fs-extra');
var _ = require('lodash');

var debug = require('debug')('model-java');

async function run(data,targetFile){
  let content = await fse.readFile('src/templates/index.tpl','utf-8');
  let template = _.template(content);
  debug('data',data);
  let r = template(data);
  r = r.split('\n').map(r=>r.trimEnd()).join('\n');
  if(targetFile){
    await fse.ensureFile(targetFile);
    await fse.writeFile(targetFile,r);
  }
  return r;
}

module.exports = {
  run,
};


