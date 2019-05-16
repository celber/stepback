Kjs.Container = function (config) {
    Kjs.Component.call(this, config);

    for (var i in this.items) {
        this.items[i] = this.createItem(this.items[i]);
    }
};

(function (self) {
    Kjs.extend(self, Kjs.Component.prototype);

    self.classList = self.classList.concat(['kjs-container']);
    self.layout = null;
    self.containerEl = null;
    self.items = [];

    self.addItem = function (item) {
        this.items.push(this.createItem(item));
        this.renderTo(this.parent);
    };

    self.getContainerEl = function () {
        return this.el;
    };

    self.createItem = function (itemConfig) {
        return Kjs.ComponentManager.create(itemConfig);
    };

    self.renderTo = function(target) {
        Kjs.Component.prototype.renderTo.call(this, target);

        this.containerEl = this.getContainerEl();

        for (var i in this.items) {
            this.items[i].rendered || this.items[i].renderTo(this.containerEl);
        }
    };


}(Kjs.Container.prototype));

Kjs.ComponentManager.register('container', Kjs.Container);