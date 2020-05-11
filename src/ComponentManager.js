'use strict';
/**
 * Component Manager
 * @class
 * @static
 * @hideconstructor
 */
Sb.ComponentManager = function () {

};

(function(/** @alias Sb.ComponentManager.prototype */ self) {
    self.registry = {};

    /**
     * Register new component type
     * @param {String} type component ctype alias
     * @param {Function} construct component constructor
     */
    self.register = function (type, construct) {
        if (this.registry[type]) {
            new Error('Component '+type+' already exists in Component Managers!');
        }
        this.registry[type] = construct;
    };

    /**
     * Get constructor for given ctype
     * @param {String} ctype Component class alias
     * @returns {Function} Component constructor
     */
    self.get = function (ctype) {
        if (!this.registry[ctype]) {
            new Error('Component '+ctype+' does not exists in Component Managers!');
        }
        return this.registry[ctype];
    };

    /**
     * Create component from config containing 'ctype'
     * @param {Object} config
     * @returns {Sb.Component} created component 
     */
    self.create = function (config) {
        var cls = self.get(config.componentType);
        return new cls(config);
    };
}(Sb.ComponentManager.prototype));

Sb.ComponentManager = new Sb.ComponentManager();