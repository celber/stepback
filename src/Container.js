Kjs.Container = function (config) {
    Kjs.Component.call(this, config);

    for (var i in this.items) {
        this.items[i] = this.createItem(this.items[i]);
    }
};

(function (self) {
    Kjs.extend(self, Kjs.Component.prototype);

    self.layout = null;
    self.items = [];

    self.addItem = function (item) {
        this.items.push(item);
    };

    self.createItem = function (itemConfig) {
        return Kjs.ComponentManager.create(itemConfig);
    };

    self.renderTo = function(target) {
        Kjs.Component.prototype.renderTo.call(this, target);
        for (var i in this.items) {
            this.items[i].renderTo(this.el);
        }
    };
}(Kjs.Container.prototype));