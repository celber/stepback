Sb.namespace("layout");
/**
 * @classdesc Layout for one element, it stretches it to fit whole container
 * @class
 * @augments Sb.Container
 * @param {Object} [_config={}] config
 */
Sb.layout.Fit = function (_config) {
  Sb.Container.call(this, _config);
  
  this.baseClass = 'sb-fit-layout';

  this.classList = this.classList.push(this.baseClass);
    
  /**
   * Default template
   * @override
   */
  this.template = `<div></div>`;
};

(function (/** @alias Sb.layout.Fit.prototype */ extend) {
    
})(Sb.layout.Fit.prototype);

Sb.extend(Sb.layout.Fit, Sb.Container);
Sb.ComponentManager.register('fit', Sb.layout.Fit);