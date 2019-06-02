"use strict";
Sb.Component = function (_config) {
    var config = _config || {};

    Sb.extend(this, config);

    if (!config.id) {
        this.id = Sb.Component.getId();
    }
};

Sb.Component.NEXT_ID = 1;

Sb.Component.getId = function () {
    return "sb-" + Sb.Component.NEXT_ID++;
}; 

(function (self) {
    var baseClass = 'sb-component';
    self.id;
    self.el;
    self.rendered = false;
    self.parent;
    self.baseClass = baseClass;
    self.classList = [baseClass];

    self.template = '<div></div>';
    self.templateData = {};

    self.renderTo = function (target) {
        this.beforeRender(target);
        this.el = this.el || Sb.Element.render(Sb.formatString(this.template, this.templateData));
        this.el.setAttribute('id', this.id);
        if (this.classList.length) {
            this.el.addClass.apply(this.el, this.classList);
        }
        this.parent = target;
        target.append(this.el);
        this.rendered = true;
        this.afterRender(target);
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

    // abstract
    self.beforeRender = function (target) {};
    self.afterRender = function (target) {};

} (Sb.Component.prototype));

Sb.ComponentManager.register('component', Sb.Component);