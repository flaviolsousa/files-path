# files-path
JS Library to List Files in a Folder List

[![Build Status](https://travis-ci.org/flaviolsousa/files-path.svg?branch=master)](https://travis-ci.org/flaviolsousa/files-path)
[![codecov](https://codecov.io/gh/flaviolsousa/files-path/branch/master/graph/badge.svg)](https://codecov.io/gh/flaviolsousa/files-path)
[![dependencies Status](https://david-dm.org/flaviolsousa/files-path/status.svg)](https://david-dm.org/flaviolsousa/files-path)
[![Known Vulnerabilities](https://snyk.io/test/github/flaviolsousa/files-path/badge.svg)](https://snyk.io/test/github/flaviolsousa/files-path)

## Super simple to use
files-path is designed to be the simplest way possible to list files in a path.
```js
var fp = require('files-path');
var files = fp.sync({
  basePath: 'tests/documents',
  path: 'dir-b/dir-z'
});

console.log(JSON.stringify(files, null, 2));
```
*console output:*
```json
[
  {
    "name": "file-dir-b.txt",
    "path": "dir-b",
    "fullName": "tests/documents/dir-b/file-dir-b.txt",
    "fullPath": "tests/documents/dir-b"
  },
  {
    "name": "file-dir-z.txt",
    "path": "dir-b/dir-z",
    "fullName": "tests/documents/dir-b/dir-z/file-dir-z.txt",
    "fullPath": "tests/documents/dir-b/dir-z"
  }
]
```

## Table of contents
- [Methods](#methods)
- [Options](#options)
- [Full Samples](#full-samples)
- [License](#license)

[back to top](#table-of-contents)

---

## Methods

See: [Options](#options)

<dl>
  <dt>Get files list synchronous</dt>
  <dd>
    <code>var files = require('files-path').sync(options);</code>
  </dd>
  <dt>Require lib with default options and get files list synchronous</dt>
  <dd>
    <code>var files = require('files-path')(defaultOptions).sync(options);</code>
  </dd>
</dl>

[back to top](#table-of-contents)

---

## Options

<dl>
  <dt>basePath</dt>
  <dd>
    <em>Default: <b>.</b> (current folder)</em>
    <br/>
    Initial folder search
    <br/>
    <em>The files on this path will not be returned</em>
    <br/>
    <code>./my/relative/initial/path</code>
  </dd>

  <dt>useBasePath</dt>
  <dd>
    <em>Default: <b>false</b></em>
    <br/>
    The files distributed on this path will be listed
    <br/>
    <em>The files on this path will not be returned</em>
    <br/>
    <code>./my/relative/initial/path</code>
  </dd>

  <dt>filters</dt>
  <dd>
    <em>Default: <b>undefined</b></em>
    <br/>
    If you add at least one filter, only the files that match this filters will be returned
    <br/>
    <br/>
    <em><b>Note:</b> If no filter is informed, all files are returned</em>
    <hr/>
    <h5>Simple string</h5>
    <code>
      filters: ["*.txt", "*.js"]
    </code>
    <hr/>
    <h5>Simple regex</h5>
    <code>
      filters: [ /^file.*m\.(txt|js)$/gi ]
    </code>
    <hr/>
    <h5>Simple string with callback</h5>
    <code>
      filters: [ { pattern: "file*.txt", callback: function (file) {console.log(file.fullName)} ]
    </code>
    <hr/>
    <h5>Simple regex with callback</h5>
    <code>
      filters: [ { pattern: /^file.*m\.(txt|js)$/gi, callback: function (file) {console.log(file.fullName)} ]
    </code>
    <hr/>
  </dd>

  <dt>verbose</dt>
  <dd>
    <em>Default: <b>false</b></em>
    <br/>
    Show logs on console
  </dd>

  <dt>maxDeep</dt>
  <dd>
    <em>Default: <b>50</b></em>
    <br/>
    Maximum number of folders to be scanned
    </dd>
  
</dl>

[back to top](#table-of-contents)

---

## Full Samples

### With this folder structure:
```
.
└┄ tests
   └┄ documents
      ├┄ dir-a
      │  └┄ file-dir-a.txt
      ├┄ dir-b
      │  ├┄ dir-x
      │  │  ├┄ dir-a
      │  │  │  └┄ file-dir-a.txt
      │  │  ├┄ 1file-dir-x.js
      │  │  └┄ 2file-dir-x.txt
      │  └┄ file-dir-b.txt
      └┄ basePath.txt
```
### Basic
```js
var fp = require('files-path');
var files = fp.sync({
  basePath: 'tests/documents',
  path: 'dir-b/dir-x'
});
console.log(JSON.stringify(files, null, 2));
```
```json
[
  {
    "name": "file-dir-b.txt",
    "path": "dir-b",
    "fullName": "tests\\documents\\dir-b\\file-dir-b.txt",
    "fullPath": "tests\\documents\\dir-b"
  },
  {
    "name": "1file-dir-x.js",
    "path": "dir-b\\dir-x",
    "fullName": "tests\\documents\\dir-b\\dir-x\\1file-dir-x.js",
    "fullPath": "tests\\documents\\dir-b\\dir-x"
  },
  {
    "name": "2file-dir-x.txt",
    "path": "dir-b\\dir-x",
    "fullName": "tests\\documents\\dir-b\\dir-x\\2file-dir-x.txt",
    "fullPath": "tests\\documents\\dir-b\\dir-x"
  }
]
```

### Use basePath + Simple Filters (string, regex and callback)
```js
var fp = require('files-path');
fp.sync({
  basePath: 'tests/documents',
  path: 'dir-b/dir-x',
  useBasePath: true,
  filters: [{
    pattern: '*.js',
    callback: function (file) {
      console.log('filter1: ' + file.name);
    }
  }, {
    pattern: /^[a-zA-Z\.]+$/g,
    callback: function (file) {
      console.log('filter2: ' + file.fullName);
    },
  }]
});
```
```
filter2: tests\documents\basePath.txt
filter1: 1file-dir-x.js
```

### Use default options
```js
var fp = require('files-path')({
  basePath: 'tests/documents'
});
var exec1 = fp.sync({
  path: 'dir-b/dir-x',
  filters: ['*.txt']
});
var exec2 = fp.sync({
  path: 'dir-a'
});
console.log(JSON.stringify(exec1, null, 2));
console.log('--');
console.log(JSON.stringify(exec2, null, 2));
```
```json
[
  {
    "name": "file-dir-b.txt",
    "path": "dir-b",
    "fullName": "tests\\documents\\dir-b\\file-dir-b.txt",
    "fullPath": "tests\\documents\\dir-b"
  },
  {
    "name": "2file-dir-x.txt",
    "path": "dir-b\\dir-x",
    "fullName": "tests\\documents\\dir-b\\dir-x\\2file-dir-x.txt",
    "fullPath": "tests\\documents\\dir-b\\dir-x"
  }
]
--
[
  {
    "name": "file-dir-a.txt",
    "path": "dir-a",
    "fullName": "tests\\documents\\dir-a\\file-dir-a.txt",
    "fullPath": "tests\\documents\\dir-a"
  }
]
```

[back to top](#table-of-contents)

---

## Todo list
- async
- filter by function

## License
Apache-2.0 © Flavio L Sousa (flasoft@gmail.com)
