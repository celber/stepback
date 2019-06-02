Sb.Container = function (config) {
    Sb.Component.call(this, config);

    for (var i in this.items) {
        this.items[i] = this.createItem(this.items[i]);
    }
};

(function (self) {
    Sb.extend(self, Sb.Component.prototype);

    self.classList = self.classList.concat(['sb-container']);
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
        return Sb.ComponentManager.create(itemConfig);
    };

    self.renderTo = function(target) {
        var suspendItemRender = false;
        Sb.Component.prototype.renderTo.call(this, target);

        this.containerEl = this.getContainerEl();

        for (var i = 0; i < this.items.length; ++i) {
            suspendItemRender = !!this.beforeItemRender(this.items[i], i, this.containerEl);
            suspendItemRender || this.renderItem(this.items[i], this.containerEl);
            suspendItemRender || this.afterItemRender(this.items[i], i, this.containerEl);
        }
    };

    self.renderItem = function (item, containerEl) {
        item.rendered || item.renderTo(containerEl);
        return item;
    }

    self.beforeItemRender = function (item, itemIdx, containerEl) {
        // abstract
    };

    self.afterItemRender = function (item, itemIdx, containerEl) {
        // abstract
    };
}(Sb.Container.prototype));

Sb.ComponentManager.register('container', Sb.Container);