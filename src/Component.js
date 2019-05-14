"use strict";
Kjs.Component = function (_config) {
    var config = _config || {};

    Kjs.extend(this, config);

    if (!config.id) {
        this.id = Kjs.Component.getId();
    }
};

Kjs.Component.NEXT_ID = 1;

Kjs.Component.getId = function () {
    return "kjs-" + Kjs.Component.NEXT_ID++;
}; 

(function (self) {
    self.id;
    self.el;
    self.rendered = false;
    self.parent;
    self.classList = [];

    self.template = '<div></div>';

    self.renderTo = function (target) {
        this.el = this.el || Kjs.Element.render(this.template);
        this.el.setAttribute('id', this.id);
        if (this.classList.length) {
            this.el.addClass(this.classList);
        }
        this.parent = target;
        target.append(this.el);
        this.rendered = true;
        return this;
    };

    self.addClass = function (cls) {
        this.el.addClass(cls);
        this.classList.push(cls);
    };

    self.removeClass = function (cls) {
        this.el.removeClass(cls);
        this.classList = this.classList.filter(function(value) {
            return value !== cls;
        });
    };
} (Kjs.Component.prototype));

Kjs.ComponentManager.register('component', Kjs.Component);