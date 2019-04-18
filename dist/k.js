var Kjs = {
    scope: null,
    options: {
        fx: {
            animations: true,
            duration: 1
        },
        map: {
            apiKey: String
        }
    },
    constructor: function (scope, options) {
        this.scope = scope;
        this.options = options;
    }
};

Kjs.namespace = function (namespace) {
    var ns = namespace.split('.'), key, i;
    for (i = 0; i < ns.length; ++i) {
        
    }
};

Kjs.clone = function (source) {
    return Object.assign({}, source);
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
