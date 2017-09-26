'use strict';

var fs = require('fs');
var processFile = require('./process-file');
var processFileInit = require('./process-file-init');
var processFileFinish = require('./process-file-finish');

function processPath(options) {
  processFileInit(options);
  if (options.stop) { return; }

  var currentFolder = options.basePath + '/' + options.processed;
  fs.readdirSync(currentFolder).forEach(function (file) {
    processFile(options, currentFolder, file);
  });
  if (options.processed.length !== options.path.length) {
    processPath(options);
  }
  processFileFinish(options);
}

module.exports = processPath;
