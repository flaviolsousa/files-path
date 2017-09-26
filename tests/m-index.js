(function () {
  'use strict';

  describe("index", function () {

    require('./mocha/sync-test');
    require('./mocha/async-callback-test');
    require('./mocha/async-promise-test');

  });
})();
