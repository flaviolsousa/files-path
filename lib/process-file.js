'use strict';


var fs = require('fs');
var path = require('path');
var testFilters = require('./test-filters');
var log = require('./log');

module.exports = function (options, currentFolder, file) {
  var objFile = {
    name: file,
    path: path.normalize(options.processed),
    fullName: path.normalize(currentFolder + '/' + file),
    fullPath: path.normalize(currentFolder),
  };

  if (objFile.path.endsWith(path.sep)) {
    objFile.path = objFile.path.slice(0, -1);
  }
  if (objFile.fullPath.endsWith(path.sep)) {
    objFile.fullPath = objFile.fullPath.slice(0, -1);
  }

  log(options, 'objFile.fullName: ' + objFile.fullName);
  log(options, 'options.processed: ' + options.processed);
  log(options, 'nextFolder: ' + currentFolder);
  log(options, 'file: ' + file);
  log(options, 'options.basePath: ' + options.basePath);
  log(options, 'objFile: ' + JSON.stringify(objFile));

  if ((!fs.lstatSync(objFile.fullName).isDirectory()) &&
    (options.useBasePath || objFile.path !== '.') &&
    testFilters(options, objFile)) {
    if (options.stop) { return; }
    options.result.push(objFile);
  }
};
