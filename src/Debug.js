//removeIf(!debug)
'use strict';

Sb.namespace('debug');

/**
 * @classdesc Debugging utilities
 * @class
 * @singleton
 */
Sb.debug = (new function () {
  /**
   * Current runtime statistics
   */
  this.stats = {
    componentsCreated: 0,
    /**
     * @type Number | String
     */
    initTime: 'Not checked. Use <pre>Sb.debug.markEndOfInit();</pre> after app initial script',
  };

  this._startOfInit = performance.now();
  /**
   * Container wrapper for nested components
   */
  this.popups = true;

  this.level = 0x15;
  this.NONE = 0x0;
  this.ERROR = 0x1;
  this.WARN = 0x3;
  this.INFO = 0x7;
  this.DEBUG = 0x15;

  return this;
}());


(function (/** @alias Sb.debug.prototype */ self) {
  self.popup = function (level, msg) {};

  self.warn = function (context, msg) {
    console.warn(`🤒 ${msg}`);
  };

  self.error = function () {
    throw '🐄 error handling is not part of Sb.debug module. Use Sb.error instead';
  };

  self.markEndOfInit = function () {
    Sb.debug.stats.initTime = performance.now() - Sb.debug._startOfInit;
  };

  self.info = function (context, msg) {
    console.info(`${msg}`);
  };

  self.log = function (context, msg) {
    console.log(`${msg}`);
  };
}(Sb.debug.constructor.prototype));

Sb.debug.log(null, 'Debug tools are ready');

//endRemoveIf(!debug)
