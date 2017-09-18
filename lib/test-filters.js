'use strict';

var escapeStringRegexp = require('escape-string-regexp');
var log = require('./log');

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
  log(options, 'testFilters: ' + statusFilter);
  return statusFilter;
}

module.exports = testFilters;
