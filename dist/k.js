Kjs.Component = function (config) {
    Kjs.merge(this, config);
};

(function (self) {
    self.el;
    self.template;
    self.parent;
} (Kjs.Component.prototype));
Kjs.Container = function (config) {
    Kjs.Component.constructor.call(this);
};

(function (self) {
    self.layout = null;
    self.items = null;
}(Kjs.Container.prototype));
'use strict';

var Kjs = {};

Kjs.config = {
    fx: {
        animations: true,
        duration: 1
    },
    map: {
        apiKey: String
    }
};

Kjs.namespace = function (namespace) {
    var ns = namespace.split('.'), 
        branch = this,
        i;

    for (i = 0; i < ns.length; ++i) {
        if (!branch[ns[i]]) {
            branch[ns[i]] = {}
        }
        
        branch = branch[ns[i]];
    }

    return branch;
};

Kjs.clone = function (source) {
    var target = Object();

    for (var nextKey in source) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
            target[nextKey] = source[nextKey];
        }
    }

    return target;
};

Kjs.merge = function (target, source) {
    for (var key in source) {
        if (typeof source[key] == 'object') {
            (target[key] === undefined) && (target[key] = {}); 
            this.merge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
};