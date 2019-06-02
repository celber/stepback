Sb.ComponentManager = function () {

};

(function(self) {
    self.registry = {};

    self.register = function (type, construct) {
        if (this.registry[type]) {
            new Error('Component '+type+' already exists in Component Managers!');
        }
        this.registry[type] = construct;
    };

    self.get = function (type) {
        if (!this.registry[type]) {
            new Error('Component '+type+' does not exists in Component Managers!');
        }
        return this.registry[type];
    };

    self.create = function (config) {
        var cls = self.get(config.componentType);
        return new cls(config);
    };
}(Sb.ComponentManager.prototype));

Sb.ComponentManager = new Sb.ComponentManager();