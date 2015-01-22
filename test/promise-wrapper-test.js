namespace.module('promise-wrapper.test', function (exports, require) {
  var pwrap = require('promise-wrapper');
  var qhelper = require('qunit.helper');

  QUnit.module("promise-wrapper");

  QUnit.test("exported functions", function(assert) {
    qhelper.assertAllMethods(assert, pwrap,
      [
        "wrapSync", "wrapCallback", "get", "Demand"
      ]);
  });

  QUnit.asyncTest("wrapSync", function(assert) {
    expect(1);

    var pConcat = pwrap.wrapSync(concat);
    var p = pConcat(deferred("Hello"), deferred(", World"));
    p.then(function (value) {
      assert.equal(value, "Hello, World");
      QUnit.start();
    });
  });

  QUnit.asyncTest("wrapCallback", function(assert) {
    expect(1);

    var pSampleCallback = pwrap.wrapCallback(sampleCallback);
    var p = pSampleCallback("hello, ", "world");
    p.then(function (value) {
      assert.equal(value, "hello, world");
      QUnit.start();
    });
  });

  QUnit.asyncTest("get", function(assert) {
    expect(1);

    var p = pwrap.get("/test/sample-data.json");
    p.then(function (value) {
      assert.deepEqual(value, {string: 'sample', a: [1, 2, 3]});
      QUnit.start();
    }).catch(function (err) {
      assert.ok(false, err);
      QUnit.start();
    });;
  });

  QUnit.asyncTest("Demand", function(assert) {
    expect(5);
    var resolveCount = 0;

    function resolver(resolve) {
      resolveCount++;
      resolve(true);
    }

    var p = new Promise(resolver);
    assert.equal(resolveCount, 1, "Promise executor called.");

    var d = new pwrap.Demand(resolver);
    assert.equal(resolveCount, 1, "Demand executor not called.");

    Promise.all([p, d]).then(function (values) {
      assert.equal(resolveCount, 2, "Promise and Demand executor called.");
      assert.equal(values[0], true, "promise resolves");
      assert.equal(values[1], true, "demand resolves");
      QUnit.start();
    }).catch(function (error) {
      assert.ok(false, error);
      QUnit.start();
    });
  });

  // Helper functions

  function concat(a, b) {
    return a.toString() + b.toString();
  }

  function deferred(value) {
    return new Promise(function (resolved) {
      setTimeout(function () { resolved(value); }, 100);
    });
  }

  function sampleCallback(a, b, callback) {
    setTimeout(function () {
      callback(concat(a, b));
    }, 100);
  }


});
