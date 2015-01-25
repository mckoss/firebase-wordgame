namespace.module('func-wrappers', function(exports, require) {
  var types = require('namespace.types');

  exports.extend({
    dedup: dedup,
    rateLimit: rateLimit
  });

  function dedup(fn) {
    var lastArgString;

    return function() {
      var argString = JSON.stringify(arguments);
      if (argString != lastArgString) {
        lastArgString = argString;
        fn.apply(undefined, arguments);
      }
    };
  }

  function rateLimit(minInterval, fn) {
    var lastCall = 0;

    return function() {
      var now = Date.now();
      if (now >= lastCall + minInterval) {
        lastCall = now;
        fn.apply(undefined, arguments);
      }
    };
  }
});
