'use strict';

var fs = require('fs');
var log = require('log-verbose');
var processFile = require('./process-file');
var processFileInit = require('./process-file-init');
var processFileFinish = require('./process-file-finish');

function finish(options, callback) {
  processFileFinish(options);
  delete options.stop;
  callback(null, options.result);
}

function processPath(options, callback) {
  if (options.stop) { return; }
  processFileInit(options, callback);
  if (options.stop) { return; }
  var currentFolder = options.basePath + '/' + options.processed;
  fs.readdir(currentFolder, function (err, files) {
    if (options.stop) { return; }
    log(options, 'async folder');
    if (err) {
      options.stop = true;
      callback(err);
    }
    files.forEach(function (file) {
      processFile(options, currentFolder, file);
    });
    if (options.processed.length !== options.path.length) {
      processPath(options, callback);
    } else {
      if (options.stop) { return; }
      finish(options, callback);
    }
  });

}

module.exports = processPath;
