Kjs.Container = function (config) {
    Kjs.Component.call(this, config);

    this.createItems();
};

(function (self) {
    self.layout = null;
    self.items = [];

    self.append = function (item) {
        this.items.push(item);
    };

    self.createItems = function () {
        for (var i in this.items) {
            console.log(this.items[i]);

            this.items[i] = Kjs.ComponentManager.create(this.items[i]);
        }
    }
}(Kjs.Container.prototype));