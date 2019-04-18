Kjs.Container = function (config) {
    Kjs.Component.constructor.call(this);
};

(function (self) {
    self.layout = null;
    self.items = [];

    self.append = function (item) {
        this.items.push(item);
    };
}(Kjs.Container.prototype));