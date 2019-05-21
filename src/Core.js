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

Kjs.extend = function (target, source) {
    for (var key in source) {
        if (source[key] instanceof Array) {
            (target[key] === undefined) && (target[key] = []);
            target[key] = target[key].concat(source[key]);
        } else if (typeof source[key] == 'object' && typeof target[key] == 'object' && target[key] !== null) {
            (target[key] === undefined) && (target[key] = {}); 
            this.extend(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
};