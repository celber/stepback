'use strict';
/**
 * @classdesc Container component which has layout and nested components
 * @class
 * @extends Sb.Component
 */
Sb.Container = function (config) {
    Sb.Component.call(this, config);

    for (var i in this.items) {
        this.items[i] = this.createItem(this.items[i]);
    }
};

(function (/** @alias Sb.Container.prototype */ self) {
    Sb.extend(self, Sb.Component.prototype);

    self.classList = self.classList.concat(['sb-container']);
    /**
     * Layout instance
     */
    self.layout = null;

    /**
     * Container wrapper for nested components
     * @private
     */
    self.containerEl = null;

    /**
     * Nested components and containers
     * @type Array<Sb.Component|Sb.Container>
     */
    self.items = [];

    /**
     * Adds item to container
     * @param {Sb.Component} item
     */
    self.addItem = function (item) {
        this.items.push(this.createItem(item));
        this.renderTo(this.parent);
    };

    /**
     * Returns container wrapper element
     * @returns {HTMLElement} wrapper element
     */
    self.getContainerEl = function () {
        return this.el;
    };

    /**
     * Creates item instance
     * @private
     */
    self.createItem = function (itemConfig) {
        return Sb.ComponentManager.create(itemConfig);
    };

    /**
     * Renders itself and all children to given target
     * @override
     * @param {Sb.Container|HTMLElement} target
     */
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

    /**
     * Renders item instance
     * @private
     */
    self.renderItem = function (item, containerEl) {
        item.rendered || item.renderTo(containerEl);
        return item;
    }

    /**
     * @abstract
     */
    self.beforeItemRender = function (item, itemIdx, containerEl) {};

    /**
     * @abstract
     */
    self.afterItemRender = function (item, itemIdx, containerEl) {};
}(Sb.Container.prototype));

Sb.ComponentManager.register('container', Sb.Container);