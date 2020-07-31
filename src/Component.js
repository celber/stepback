'use strict';
/**
 * @class
 * @classdesc Svarog base component
 * @param {Object} [_config={}]  Configuration object
 * @extends Sb.mixin.Observable
 */
Sb.Component = function (_config) {
    var config = _config || {};

    Sb.mixin.Observable.call(this);

    if (!config.id) {
        this.id = Sb.Component.getId();
    }

    /**
     * Sb.Element instance
     * @type {Sb.Element|HTMLElement}
     */
    this.el = null;

    /**
     * Set to true if component was already rendered
     * @type {Boolean}
     */
    this.rendered = false;

    /**
     * Parent container
     * @type {Sb.Container}
     */
    this.parent = null;

    /**
     * Initial CSS class for component
     * @type {String}
     */
    this.baseClass = 'sb-component';

    /**
     * Initial CSS classes (includes {@link Sb.Component#baseClass})
     * @type {Array<String>}
     */
    this.classList = [this.baseClass];

    /**
     * Template used to render component
     * @see {@link Sb.formatString}
     * @type String
     */
    this.template = '<div></div>';

    /**
     * Key => value mapped object of values which are gonna be injected into template
     * @type Object
     */
    this.templateData = {};


    Sb.merge(this, config);

    //removeIf(!debug)
    Sb.debug.stats.componentsCreated++;
    //endRemoveIf(!debug)
};

/**
 * First element ID, this is incremented automatically when component without ID is created.
 * @constant
 * @static
 */
Sb.Component.NEXT_ID = 1;

/**
 * gets next element Id using {@link Sb.Component.NEXT_ID}
*/
Sb.Component.getId = function () {
    return "sb-" + Sb.Component.NEXT_ID++;
}; 

/**
 * Component was rendered.
 *
 * @event Sb.Component#render
 * @type {Sb.Component}
 */

/**
 * Component was shown.
 *
 * @event Sb.Component#show
 * @type {Sb.Component}
 */

/**
 * Component was hidden.
 *
 * @event Sb.Component#hide
 * @type {Sb.Component}
 */

(function (/** @alias Sb.Component.prototype */ self) {

    /**
     * Renders component to given container
     */
    self.renderTo = function (target) {
        this.beforeRender(target);
        this.el = this.el || Sb.Element.render(Sb.formatString(this.template, this.templateData));
        this.el.setAttribute('id', this.id);
        if (this.classList.length) {
            this.el.addClass.apply(this.el, this.classList);
        }
        this.parent = target;
        target.append(this.el);
        this.rendered = true;
        this.afterRender(target);
        this.fire('render', this);
        return this;
    };

    /**
     * Add CSS class to component
     */
    self.addClass = function (cls) {
        this.el.addClass(cls);
        this.classList.push(cls);
    };

    /**
     * Removes CSS class from component
     */
    self.removeClass = function (cls) {
        this.el.removeClass(cls);
        this.classList = this.classList.filter(function(value) {
            return value !== cls;
        });
    };

    /**
     * fired before component is rendered
     * @virtual
     */
    self.beforeRender = function (target) {};
    /**
     * fired after component is rendered
     * @virtual
     */
    self.afterRender = function (target) {};
}(Sb.Component.prototype));
Sb.mixin(Sb.Component, Sb.mixin.Observable);

Sb.ComponentManager.register('component', Sb.Component);