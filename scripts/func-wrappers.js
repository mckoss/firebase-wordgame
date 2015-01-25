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

  /**
   * Makes sure fn is called no more frequently than once each minInterval
   * (ms). Also guarantees that the most recent call will be made no more than
   * minInterval after repeated calls have ceased.
   *
   * @param {number} minInterval
   * @param {function([?]): RETURNS} fn
   * @return {RETURNS}
   * @template RETURNS
   */
  function rateLimit(minInterval, fn) {
    var lastCall = 0;
    var args;
    var timeoutId;

    function timedOut() {
      if (args === undefined) {
        return;
      }
      timeoutId = undefined;
      fn.apply(undefined, args);
    }

    return function() {
      var now = Date.now();
      if (now >= lastCall + minInterval) {
        lastCall = now;
        fn.apply(undefined, arguments);
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(timedOut, minInterval);
      } else {
        args = types.copyArray(arguments);
      }
    };
  }
});
