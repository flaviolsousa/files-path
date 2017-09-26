'use strict';

var processFileFinish = require('./process-file-finish');

module.exports = function (options, callback) {
  if (!options.iteration) {
    options.processed = options.path === '.' ? '.' : '';
    options.iteration = 1;
    options.stop = false;
  } else {
    if (options.iteration++ > options.maxDeep) {
      processFileFinish(options);
      if (callback) {
        callback(null, options.result);
      }
      options.stop = true;
      return; // Protect yourself from infinite recursive loop
    }
    var restName = options.path.substring(options.processed.length);
    options.processed = options.processed + restName.replace(/(\w)\/.*/, '$1');
  }
};

