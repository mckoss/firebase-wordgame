namespace.module('namespace.funcs.test', function (exports, require) {
  var funcs = require('namespace.funcs');

  QUnit.module("namespace-plus");

  QUnit.test("singleton", function(assert) {
    assert.equal(getState(), 2);
    assert.equal(getState(), 3);
    var s = funcs.singleton(getState);
    assert.equal(s(), 4);
    assert.equal(s(), 4);
  });

  // Helpers
  var state = 1;

  function getState() {
    state += 1;
    return state
  }

});
