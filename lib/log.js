
'use strict';

var path = require('path');

function log() {
  if (arguments && arguments.length > 0) {
    if (arguments[0].verbose === true) {
      var value = arguments[1];
      try {
        var vStack2 = ((new Error().stack).split("at ")[2]).trim();
        var rootDir = __dirname.replace(/^(.*).node_modules(.*)$/, '$1');

        var exec = vStack2.replace(/\s.*/ig, "");
        exec = exec.substr(rootDir.length);
        exec = './lib' + exec;
        exec = path.normalize(exec);
        exec = exec.replace(/\\/g, '/');

        console.log(exec + ': ' + value);
      } catch (error) {
        console.log(error);
        console.log(JSON.stringify(error));
      }
    }
  }
}

module.exports = log;
