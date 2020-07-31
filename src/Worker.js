'use strict';
/**
 * @classdesc Web Worker which supports inline functions and script files
 * @class
 * @param {Function|String} body Worker function or script location
 * @extends Sb.mixin.Observable
 */
Sb.Worker = function (body) {
    var blobURL;

    if (typeof body == "function") {
      blobURL = URL.createObjectURL( new Blob(
        [ '(', body.toString(),')()' ],
        { type: 'application/javascript' } )
      );

      this.worker = new Worker( blobURL );

      // delete blobUrl from memory
      URL.revokeObjectURL( blobURL );
    } else {
      this.worker = new Worker( body );
    }

    Sb.mixin.Observable.call(this);

    this.worker.onmessage = this._onMessage.bind(this);
};


/**
 * Message received from worker.
 *
 * @event Sb.Worker#message
 * @type {*}
 */

(function (/** @alias Sb.Worker.prototype */ self) {

    /**
     * Sends message to worker thread
     * @param {*} message Payload for a worker
     */
    self.post = function (message) {
      this.worker.postMessage(message);
    };

    /**
     * Terminates worker thread
     */
    self.terminate = function () {
        return this.worker.terminate();
    };

    /**
     * Internal event handler
     * @private
     * @fires message
     */
    self._onMessage = function (msg) {
      return this.fire('message', msg);
  };

}(Sb.Worker.prototype));

Sb.mixin(Sb.Worker, Sb.mixin.Observable);