/*!
 * @name JavaScript/NodeJS files-path (fp)
 * @author Flavio L Sousa
 * @repository https://github.com/flaviolsousa/files-path#readme

 * Copyright 2017 Flavio L Sousa - Apache License
 * https://raw.githubusercontent.com/flaviolsousa/files-path/master/LICENSE
 */

'use strict';

var merge = require('merge');
var path = require('path');

var defaultOptions = require('./default-options');
var log = require('log-verbose');

var sync = require('./sync');
var async = require('./async');

function FilesPath(options) {
  var instance = this;

  this.options = defaultOptions();
  merge(this.options, options);


  function enrichOptions(userOptions) {
    var options = merge(true, instance.options);
    options = merge(options, userOptions);
    options.path = path.normalize(options.path).replace(/\\/g, '/').replace(/\/$/, '');
    options.basePath = path.normalize(options.basePath).replace(/\\/g, '/').replace(/\/$/, '');
    options.result = [];
    return options;
  }

  this.sync = function (userOptions) {
    var options = enrichOptions(userOptions);
    log(options, 'options: ' + JSON.stringify(options));
    //processPath(options);
    sync(options);
    return options.result;
  };

  this.async = function (userOptions, callback) {
    if (callback) {
      var options = enrichOptions(userOptions);
      log(options, 'options: ' + JSON.stringify(options));
      async(options, function (err, data) {
        delete options.stop;
        callback(err, data);
      });
    } else {
      if (Promise) {
        return new Promise(function (resolve, reject) {
          instance.async(userOptions, function (err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          });
        });
      }
    }
  };

  return this;
}


function create(options) {
  return new FilesPath(options);
}
var defaultInstance = create();
create.sync = defaultInstance.sync;
create.async = defaultInstance.async;
create.options = defaultInstance.options;

module.exports = create;
