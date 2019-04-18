Kjs.Component = function (config) {
    Kjs.merge(this, config);

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
    self.template;
    self.parent;

    self.renderTo = function (target) {
        this.el = Kjs.Element.render(this.template);
        this.el.setAttribute('id', this.id);
        this.parent = target;
        target.append(this.el);
        this.rendered = true;
        return this;
    };
} (Kjs.Component.prototype));

Kjs.ComponentManager.register('component', Kjs.Component);