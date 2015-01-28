/**
 * @fileoverview Externs file for Closure compiler for namespace.js.
 */

/** @const */
var namespace = {};

/**
 * Type definition for module closure functions.
 *
 * @typedef {function(!Object, function(string): !Object)}
 */
namespace.closure;

/**
 * Namespace Module object.
 *
 * @constructor
 */
namespace.Module = function() {};


/**
 * @param {string} name
 * @param {namespace.closure?} opt_closure
 * @return {!namespace.Module}
 */
namespace.module = function(name, opt_closure) {};

/** @const */
namespace.types = {};

/**
 * @param {!Array} source
 * @return {!Array}
 */
namespace.types.copyArray = function(source) {};
