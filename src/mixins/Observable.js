Sb.layout('mixin');

/**
 * Adds event handling
 * @mixin
 */
Sb.mixin.Observable = {
  /**
   * @private
   */
  listeners: {},

  /**
   * Attach event callback
   * @param {String} eventName 
   * @param {Function} callback 
   * @param {Object} [_options] 
   * 
   * @returns {Symbol} listener Id
   */
  on: function (eventName, callback, _options) {

  },

  /**
   * Dettach event by its name+callback or symbol returned by .on
   * @param {String|Symbol} eventName 
   * @param {Function} [_callback] 
   */
  off: function (eventName, _callback) {

  },

  /**
   * Fire event
   * @param {String} eventName 
   * @param {Object} [_values]
   */
  fire: function (eventName, _values) {

  }
};