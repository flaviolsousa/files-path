'use strict';

var assert = require('assert');
var path = require('path');

// var merge = require('merge');

function requireLib() {
  return require('../../lib/files-path');
}

describe('Sync-Tests', function () {
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
    var files = requireLib().sync(options);
    // console.log('files: ', files);
    assert(files.length === 1, 'Incorrect number of files founded: ' + JSON.stringify(files));

    var file = files[0];

    assert(file.name = 'file-dir-a.txt', 'Found incorrect file');
    assert(file.path = path.normalize(options.path), 'Found incorrect path');
    assert(file.fullPath === path.normalize('tests/documents/dir-a'), 'Found incorrect fullPath\n' + file.fullPath + '\n' + path.normalize('tests/documents/dir-a'));
    assert(file.fullName === path.normalize(file.fullPath + '/' + file.name), 'Found incorrect fullName');

    done();
  });

  it('Test a single directory + basePath', function (done) {
    var options = {
      basePath: 'tests/documents',
      path: 'dir-a',
      useBasePath: true
    };
    var files = requireLib().sync(options);
    //console.log('files: ', files);
    assert(files.length === 2, 'Incorrect number of files founded: ' + JSON.stringify(files));

    var fileBasePath = files[0];
    assert(fileBasePath.name = 'basePath.txt', 'Found incorrect file');
    assert(fileBasePath.path = path.normalize(options.path), 'Found incorrect path');
    assert(fileBasePath.fullPath === path.normalize('tests/documents'), 'Found incorrect fullPath\n' + fileBasePath.fullPath + '\n' + path.normalize('tests/documents'));
    assert(fileBasePath.fullName === path.normalize(fileBasePath.fullPath + '/' + fileBasePath.name), 'Found incorrect fullName');

    var file = files[1];
    assert(file.name = 'file-dir-a.txt', 'Found incorrect file');
    assert(file.path = path.normalize(options.path), 'Found incorrect path');
    assert(file.fullPath === path.normalize('tests/documents/dir-a'), 'Found incorrect fullPath\n' + file.fullPath + '\n' + path.normalize('tests/documents/dir-a'));
    assert(file.fullName === path.normalize(file.fullPath + '/' + file.name), 'Found incorrect fullName');

    done();
  });

  it('Test a single directory + basePath by config', function (done) {
    var fp = requireLib()({
      basePath: 'tests/documents',
      useBasePath: true
    });
    var options = {
      path: 'dir-a'
    };
    var files = fp.sync(options);
    //console.log('files: ', files);
    assert(files.length === 2, 'Incorrect number of files founded: ' + JSON.stringify(files));

    var fileBasePath = files[0];
    assert(fileBasePath.name = 'basePath.txt', 'Found incorrect file');
    assert(fileBasePath.path = path.normalize(options.path), 'Found incorrect path');
    assert(fileBasePath.fullPath === path.normalize('tests/documents'), 'Found incorrect fullPath\n' + fileBasePath.fullPath + '\n' + path.normalize('tests/documents'));
    assert(fileBasePath.fullName === path.normalize(fileBasePath.fullPath + '/' + fileBasePath.name), 'Found incorrect fullName');

    var file = files[1];
    assert(file.name = 'file-dir-a.txt', 'Found incorrect file');
    assert(file.path = path.normalize(options.path), 'Found incorrect path');
    assert(file.fullPath === path.normalize('tests/documents/dir-a'), 'Found incorrect fullPath\n' + file.fullPath + '\n' + path.normalize('tests/documents/dir-a'));
    assert(file.fullName === path.normalize(file.fullPath + '/' + file.name), 'Found incorrect fullName');

    done();
  });

  it('Test a two directory in same instance + basePath by config', function (done) {
    var fp = requireLib()({
      basePath: 'tests/documents',
      useBasePath: true
    });
    var options = {
      path: 'dir-a'
    };
    var files = fp.sync(options);
    //console.log('files: ', files);
    assert(files.length === 2, 'Incorrect number of files founded: ' + JSON.stringify(files));

    var fileBasePath = files[0];
    assert(fileBasePath.name = 'basePath.txt', 'Found incorrect file');
    assert(fileBasePath.path = path.normalize(options.path), 'Found incorrect path');
    assert(fileBasePath.fullPath === path.normalize('tests/documents'), 'Found incorrect fullPath\n' + fileBasePath.fullPath + '\n' + path.normalize('tests/documents'));
    assert(fileBasePath.fullName === path.normalize(fileBasePath.fullPath + '/' + fileBasePath.name), 'Found incorrect fullName');

    var file = files[1];
    assert(file.name = 'file-dir-a.txt', 'Found incorrect file');
    assert(file.path = path.normalize(options.path), 'Found incorrect path');
    assert(file.fullPath === path.normalize('tests/documents/dir-a'), 'Found incorrect fullPath\n' + file.fullPath + '\n' + path.normalize('tests/documents/dir-a'));
    assert(file.fullName === path.normalize(file.fullPath + '/' + file.name), 'Found incorrect fullName');


    options = {
      path: 'dir-b'
    };
    files = fp.sync(options);
    //console.log('files: ', files);
    assert(files.length === 2, 'Incorrect number of files founded: ' + JSON.stringify(files));

    fileBasePath = files[0];
    assert(fileBasePath.name = 'basePath.txt', 'Found incorrect file');
    assert(fileBasePath.path = path.normalize(options.path), 'Found incorrect path');
    assert(fileBasePath.fullPath === path.normalize('tests/documents'), 'Found incorrect fullPath\n' + fileBasePath.fullPath + '\n' + path.normalize('tests/documents'));
    assert(fileBasePath.fullName === path.normalize(fileBasePath.fullPath + '/' + fileBasePath.name), 'Found incorrect fullName');

    file = files[1];
    assert(file.name = 'file-dir-b.txt', 'Found incorrect file');
    assert(file.path = path.normalize(options.path), 'Found incorrect path');
    assert(file.fullPath === path.normalize('tests/documents/dir-b'), 'Found incorrect fullPath\n' + file.fullPath + '\n' + path.normalize('tests/documents/dir-a'));
    assert(file.fullName === path.normalize(file.fullPath + '/' + file.name), 'Found incorrect fullName');


    done();
  });

  it('Test overhide a config', function (done) {
    var fp = requireLib()({
      basePath: 'tests/documents',
      useBasePath: true
    });
    var options = {
      path: 'dir-a',
      useBasePath: false
    };
    var files = fp.sync(options);
    //console.log('files: ', files);
    assert(files.length === 1, 'Incorrect number of files founded: ' + JSON.stringify(files));

    var file = files[0];

    assert(file.name = 'file-dir-a.txt', 'Found incorrect file');
    assert(file.path = path.normalize(options.path), 'Found incorrect path');
    assert(file.fullPath === path.normalize('tests/documents/dir-a'), 'Found incorrect fullPath\n' + file.fullPath + '\n' + path.normalize('tests/documents/dir-a'));
    assert(file.fullName === path.normalize(file.fullPath + '/' + file.name), 'Found incorrect fullName');

    done();
  });

  it('Filter String *.txt', function (done) {
    var fp = requireLib();
    var options = {
      path: 'dir-b\\dir-y\\dir-m',
      filters: ["*.txt"],
      basePath: 'tests/documents'
    };
    var files = fp.sync(options);
    // console.log('files: ', files);
    assert(files.length === 2, 'Incorrect number of files founded: ' + JSON.stringify(files));
    assert(files[0].name = 'file-dir-b.txt', 'Found incorrect file');
    assert(files[1].name = 'file-dir-m.txt', 'Found incorrect file');

    done();
  });

  it('Filter String *.txt, *.js', function (done) {
    var fp = requireLib();
    var options = {
      path: 'tests/documents/dir-b/dir-y/dir-m',
      filters: ['file*.txt', 'file*.js']
    };
    var files = fp.sync(options);
    // console.log('files: ', files);
    assert(files.length === 3, 'Incorrect number of files founded: ' + JSON.stringify(files));
    assert(files[0].name = 'file-dir-b.txt', 'Found incorrect file');
    assert(files[1].name = 'file-dir-m.js', 'Found incorrect file');
    assert(files[2].name = 'file-dir-m.txt', 'Found incorrect file');

    done();
  });

  it('Filter Regex', function (done) {
    var fp = requireLib();
    var options = {
      path: 'dir-b\\dir-y\\dir-m',
      filters: [{ pattern: /^file.*m\.(txt|js)$/gi }],
      basePath: 'tests/documents'
    };
    var files = fp.sync(options);

    assert(files.length === 2, 'Incorrect number of files founded: ' + JSON.stringify(files));
    assert(files[0].name = 'file-dir-m.js', 'Found incorrect file');
    assert(files[1].name = 'file-dir-m.txt', 'Found incorrect file');

    done();
  });

  it('Filter Callback', function (done) {
    var fp = requireLib();
    var validator;
    var options = {
      basePath: 'tests/documents',
      path: 'dir-b/dir-y/dir-m',
      filters: [
        {
          pattern: /^file.*m\.txt$/gi,
          callback: function (file) {
            validator += ', ' + file.name;
          }
        },
        {
          pattern: "*.js",
          callback: function (file) {
            validator = file.name;
          }
        }
      ]
    };
    var files = fp.sync(options);
    //console.log('files: ', files);
    assert(files.length === 2, 'Incorrect number of files founded: ' + JSON.stringify(files));
    assert(validator === 'file-dir-m.js, file-dir-m.txt', 'Found execution of callback: ' + validator);

    done();
  });

  it('Filter Verbose', function (done) {
    var fp = requireLib();
    var options = {
      basePath: 'tests/documents/',
      path: '.',
      useBasePath: true,
      filters: "*.txt",
      verbose: true
    };
    var tmpLog = console.log;
    var status = false;
    console.log = function () {
      status = true;
    };
    var files;
    try {
      files = fp.sync(options);
    } catch (err) {
      assert.fail('Err: ' + JSON.stringify(err));
    } finally {
      console.log = tmpLog;
    }
    if (!status) {
      assert.fail('Console never called');
    } else {
      done();
    }
  });

  it('Test maxDeep security infinity loop', function (done) {
    var options = {
      basePath: 'tests/documents',
      path: 'dir-b/dir-y/dir-m',
      filters: "file-dir-m.js",
      maxDeep: 3
    };

    var fp = requireLib()(options);
    var files = fp.sync();
    // console.log('files: ', files);
    assert(files.length === 1, 'Incorrect number of files founded: ' + JSON.stringify(files));
    assert(files[0].name = 'file-dir-m.js', 'Found incorrect file');

    options.maxDeep = 2;
    fp = requireLib()(options);
    files = fp.sync();
    // console.log('files: ', files);
    assert(files.length === 0, 'Incorrect number of files founded: ' + JSON.stringify(files));

    done();
  });

});


