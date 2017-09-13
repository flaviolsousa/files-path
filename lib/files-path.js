/*!
 * @name JavaScript/NodeJS files-path (fp)
 * @author Flavio L Sousa
 * @repository https://github.com/flaviolsousa/files-path#readme

 * Copyright 2017 Flavio L Sousa - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */

'use strict';

var merge = require('merge');
var fs = require('fs');
var path = require('path');
var escapeStringRegexp = require('escape-string-regexp');



var DEFAULT_OPTIONS = {
  basePath: '.',
  useBasePath: false,
  maxDeep: 100,
  verbose: false,
  filters: undefined
};

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

    if (options.verbose) {
      console.log('objFile.fullName: ', objFile.fullName);
      console.log('options.processed: ', options.processed);
      console.log('nextFolder: ', nextFolder);
      console.log('file: ', file);
      console.log('options.basePath: ', options.basePath);
      console.log('objFile: ', JSON.stringify(objFile));
    }

    if ((!fs.lstatSync(objFile.fullName).isDirectory()) &&
      (options.useBasePath || objFile.path !== '.') &&
      testFilters(options, objFile)) {
      options.result.push(objFile);
    }
  });
  if (options.processed.length != options.path.length) {
    processPath(options);
  }
}

function convertStringFilter(filter) {
  filter = escapeStringRegexp(filter);
  filter = filter.replace(/\\\*/g, '.*?');
  filter = '^' + filter + "$";
  filter = new RegExp(filter, 'gi');
  return filter;
}

function testFilters(options, file) {
  var statusFilter = true;
  if (options.filters) {
    statusFilter = false;
    if (typeof options.filters === 'string') {
      options.filters = [options.filters];
    }
    for (var i = 0; i < options.filters.length; i++) {
      var filter = options.filters[i];
      if (typeof filter === 'string') {
        filter = convertStringFilter(filter);
      }
      if (filter instanceof RegExp) {
        filter = {
          pattern: filter
        };
      }
      if (filter.pattern) {
        if (typeof filter.pattern === 'string') {
          filter.pattern = convertStringFilter(filter.pattern);
        }
        statusFilter = file.name.match(filter.pattern);
        if (statusFilter) {
          statusFilter = true;
          if (filter.callback) {
            filter.callback(file);
          }
          break;
        }
      }
    }
  }
  if (options.verbose) { console.log('testFilters: ', statusFilter); }
  return statusFilter;
}

function enrichOptions(options) {
  options.path = path.normalize(options.path).replace(/\\/g, '/').replace(/\/$/, '');
  options.basePath = path.normalize(options.basePath).replace(/\\/g, '/').replace(/\/$/, '');
  options.result = [];
}

function FilesPath(options) {
  var instance = this;

  this.options = merge(true, DEFAULT_OPTIONS);
  merge(this.options, options);

  this.sync = function (userOptions) {
    var options = merge(true, instance.options);
    options = merge(options, userOptions);
    enrichOptions(options);
    if (options.verbose) { console.log('options: ' + JSON.stringify(options)); }
    processPath(options);
    return options.result;
  };

  return this;
}


function create(options) {
  return new FilesPath(options);
}
var defaultInstance = create();
create.sync = defaultInstance.sync;
create.options = defaultInstance.options;

module.exports = create;
