namespace.module('qunit.helper', function (exports, require) {
  exports.extend({
    'assertAllMethods': assertAllMethods
  });

  // Call with module or class.prototype
  function assertAllMethods(assert, proto, methods) {
    methods.forEach(function (method) {
      assert.ok(typeof(proto[method]) == 'function', method + " method expected");
    });
    Object.keys(proto).forEach(function (key) {
      if (typeof(proto[key]) != 'function') {
        return;
      }
      if (methods.indexOf(key) == -1) {
        assert.ok(false, key + " method not expected");
      }
    });
  }
});
