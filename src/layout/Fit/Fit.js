Sb.namespace("layout");
/**
 * @classdesc Layout for one element, it stretches it to fit whole container
 * @class
 * @augments Sb.Container
 * @param {Object} [_config={}] config
 */
Sb.layout.Fit = function (_config) {
    Sb.Container.call(this, _config);
};

(function (/** @alias Sb.layout.Fit.prototype */ extend) {
    Sb.extend(extend, Sb.Container.prototype);
    extend.classList = extend.classList.concat(['sb-fit-layout']);
    
    /**
     * Default template
     * @override
     */
    extend.template = `<div></div>`;
})(Sb.layout.Fit.prototype);

Sb.ComponentManager.register('fit', Sb.layout.Fit);