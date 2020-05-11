'use strict';

/**
 * @classdesc Svarog global object
 * @global
 * @static
 * @class
 */
var Sb = {};

/**
 * Global config for plugins
 * @constant
 */
Sb.config = {
    fx: {
        animations: true,
        duration: 1
    },
    map: {
        apiKey: String
    }
};

/**
 * Create namespace for a class
 * @param {String} namespace dot-separated namespace
 * @example
 *  Sb.namespace('Sb.Foo.Bar')
 */
Sb.namespace = function (namespace) {
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

/**
 * clones an object
 * @param {Object} source
 * @returns {Object} cloned object
 */
Sb.clone = function (source) {
    var target = Object();

    for (var nextKey in source) {
        // Avoid bugs when hasOwnProperty is shadowed
        if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
            target[nextKey] = source[nextKey];
        }
    }

    return target;
};

/**
 * Extends an object with given source *recursively*
 * Also merges arrays and nested objects
 * @param {Object} target
 * @param {Object} source
 * 
 * @returns null
 */
Sb.extend = function (target, source) {
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

    return null;
};

/**
 * Format template string.
 * @param {String} string Template string
 * @param {Object|Map} data Key => value mapped data for template
 * 
 * @example
 * Sb.formatString("a {b}", {b: 2})
 * 
 * @returns {String} compiled string
 */
Sb.formatString = function (string, data) {
    for (var key in data) {
        string = string.replace("{" + key + "}", data[key])
    }

    return string;
};