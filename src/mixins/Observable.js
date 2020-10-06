Sb.namespace('mixin');

/**
 * @classdesc Adds event handling
 * @class
 */
Sb.mixin.Observable = function () {
  /**
   * @private
   */
  this.listeners = {};
};

(function (/** @alias Sb.mixin.Observable.prototype */ self) {
  /**
   * Attach event callback
   * @param {String} eventName
   * @param {Function} callback
   * @param {Object} [_options]
   *
   * @returns {Symbol} listener Id
   */
  self.on = function (eventName, callback, _options) {
    var eventId = Symbol();

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push({
      eventId: eventId,
      callback: callback,
      options: _options || {},
    });

    return eventId;
  };

  /**
   * Dettach event by its name+callback or symbol returned by .on
   * @param {String|Symbol} eventName
   * @param {Function} [_callback]
   */
  self.off = function (eventName, _callback) {};

  /**
   * Fire event
   * @param {String} eventName
   * @param {Object} [_values]
   */
  self.fire = function (eventName, _values) {
    var i, event;

    if (this.listeners[eventName]) {
      for (i in this.listeners[eventName]) {
        event = this.listeners[eventName][i];
        event.callback(_values);
      }
    }
  };
})(Sb.mixin.Observable.prototype);
