'use strict';

var log = require('../../lib/log');

var assert = require('assert');
var path = require('path');


// var merge = require('merge');

function requireLib() {
  return require('../../lib/files-path');
}

describe('Async-Promise-Tests', function () {
  // only skip
  /*
  it.only('TMP TEST', function () {
    var fp = requireLib(); //require('files-path');

  });
  */

  it('Test a single directory', function (done) {
    var options = {
      basePath: 'tests/documents',
      path: 'dir-a'
    };
    requireLib().async(options).then(function (files) {
      assert(files.length === 1, 'Incorrect number of files founded: ' + JSON.stringify(files));

      var file = files[0];

      assert(file.name = 'file-dir-a.txt', 'Found incorrect file');
      assert(file.path = path.normalize(options.path), 'Found incorrect path');
      assert(file.fullPath === path.normalize('tests/documents/dir-a'), 'Found incorrect fullPath\n' + file.fullPath + '\n' + path.normalize('tests/documents/dir-a'));
      assert(file.fullName === path.normalize(file.fullPath + '/' + file.name), 'Found incorrect fullName');

      done();
    }).catch(function(err) {
      assert.fail('An error occurr: ', JSON.stringify(err));
    });
  });

});


