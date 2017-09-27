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
    }).catch(function (err) {
      var strErr = 'An error occurr: ' + JSON.stringify(err);
      assert.fail(strErr);
      done(new Error(strErr));
    });
  });

  it('Test maxDeep security infinity loop', function (done) {
    var options = {
      basePath: 'tests/documents',
      path: 'dir-b/dir-y/dir-m',
      filters: "file-dir-m.js",
      maxDeep: 3
    };

    var fp = requireLib()(options);
    fp.async().then(function (files1) {

      // console.log('files: ', files);
      assert(files1.length === 1, 'Incorrect number of files founded: ' + JSON.stringify(files1));
      assert(files1[0].name = 'file-dir-m.js', 'Found incorrect file');

      options.maxDeep = 2;
      fp = requireLib()(options);
      fp.async().then(function (files2) {
        // console.log('files: ', files);
        assert(files2.length === 0, 'Incorrect number of files founded: ' + JSON.stringify(files1));

        done();
      }).catch(function (err) {
        var strErr = 'An error occurr: ' + JSON.stringify(err);
        assert.fail(strErr);
        done(new Error(strErr));
      });

    }).catch(function (err) {
      var strErr = 'An error occurr: ' + JSON.stringify(err);
      assert.fail(strErr);
      done(new Error(strErr));
    });
  });

});


