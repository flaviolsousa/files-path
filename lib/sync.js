'use strict';

var fs = require('fs');
var path = require('path');
var testFilters = require('./test-filters');
var log = require('./log');

function processPath(options) {
  if (!options.iteration) {
    options.iteration = 1;
    options.processed = options.path === '.' ? '.' : '';
  } else {
    if (options.iteration++ > options.maxDeep) {
      return; // Protect yourself from infinite recursive loop
    }
    var restName = options.path.substring(options.processed.length);
    options.processed = options.processed + restName.replace(/(\w)\/.*/, '$1');
  }
  var nextFolder = options.basePath + '/' + options.processed;
  fs.readdirSync(nextFolder).forEach(function (file) {
    var objFile = {
      name: file,
      path: path.normalize(options.processed),
      fullName: path.normalize(nextFolder + '/' + file),
      fullPath: path.normalize(nextFolder),
    };

    if (objFile.path.endsWith(path.sep)) {
      objFile.path = objFile.path.slice(0, -1);
    }
    if (objFile.fullPath.endsWith(path.sep)) {
      objFile.fullPath = objFile.fullPath.slice(0, -1);
    }

    log(options, 'objFile.fullName: ' + objFile.fullName);
    log(options, 'options.processed: ' + options.processed);
    log(options, 'nextFolder: ' + nextFolder);
    log(options, 'file: ' + file);
    log(options, 'options.basePath: ' + options.basePath);
    log(options, 'objFile: ' + JSON.stringify(objFile));

    if ((!fs.lstatSync(objFile.fullName).isDirectory()) &&
      (options.useBasePath || objFile.path !== '.') &&
      testFilters(options, objFile)) {
      options.result.push(objFile);
    }
  });
  if (options.processed.length !== options.path.length) {
    processPath(options);
  }
}

module.exports = processPath;
