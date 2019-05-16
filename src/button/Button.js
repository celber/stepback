Kjs.Button = function (_config) {
    Kjs.Component.call(this, _config);
};

(function (extend) {
    var baseClass = 'kjs-button';
    Kjs.extend(extend, Kjs.Component.prototype);
    
    extend.classList = extend.classList.concat([baseClass]);
    
    extend.template = `
        <div>
            <div class="${baseClass}-content"></div>
        </div>
    `;
})(Kjs.Button.prototype);

Kjs.ComponentManager.register('button', Kjs.Button);