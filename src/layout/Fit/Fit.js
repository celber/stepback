Sb.namespace("layout");
Sb.layout.Fit = function (_config) {
    Sb.Container.call(this, _config);
};

(function (extend) {
    Sb.extend(extend, Sb.Container.prototype);
    extend.classList = extend.classList.concat(['sb-fit-layout']);
    
    extend.template = `<div></div>`;
})(Sb.layout.Fit.prototype);

Sb.ComponentManager.register('fit', Sb.layout.Fit);