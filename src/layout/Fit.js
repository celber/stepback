Kjs.namespace("layout").Fit = function (_config) {
    Kjs.Container.call(this, _config);

    console.log(_config);
};

(function (extend) {
    Kjs.extend(extend, Kjs.Container.prototype);
    extend.classList = extend.classList.concat(['kjs-fit-container']);
    extend.template = `
        <div class="testingContainer">
        </div>`;
})(Kjs.namespace("layout").Fit.prototype);

Kjs.ComponentManager.register('fit', Kjs.namespace("layout").Fit);