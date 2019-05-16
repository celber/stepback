Kjs.namespace("layout");
Kjs.layout.Fit = function (_config) {
    Kjs.Container.call(this, _config);
};

(function (extend) {
    Kjs.extend(extend, Kjs.Container.prototype);
    extend.classList = extend.classList.concat(['kjs-fit-container']);
    
    extend.template = `<div></div>`;
})(Kjs.layout.Fit.prototype);

Kjs.ComponentManager.register('fit', Kjs.layout.Fit);