'use strict';
/**
 * @classdesc Wrapper for native {@link HTMLElement}
 * @class
 * @param {HTMLElement} el HTML Element
 * @param {Object} [config={}] Configuration object
 */
Sb.Element = function (el, config) {
    this.nativeElement = el;
    Sb.merge(this.config, config);
}; 

/**
 * Renders HTMLElement from given template
 * @static
 * @param {String} template
 * @returns {Sb.Element}
 */
Sb.Element.render = function (template) {
    var element;
    var tempEl = document.createElement('template');
    var html = template.trim(); // Never return a text node of whitespace as the result
    tempEl.innerHTML = html;
    
    element = new Sb.Element(document.adoptNode(tempEl.content.firstChild));
    element.template = template;

    return element;
};

(function (/** @alias Sb.Element.prototype */ extend) {

    /**
     * Id of element
     */
    extend.id = null;
    /**
     * Native element
     * @private
     */
    extend.nativeElement = null;
    /**
     * Config
     * @private
     */
    extend.config = {};
    extend.listeners = {};
    /**
     * Template to render
     * @see {@link Sb.formatString}
     */
    extend.template = null;

    /**
     * Check if element has CSS class
     * @param {String} cls CSS class
     */
    extend.hasClass = function (cls) {
        return Array.prototype.indexOf.call(this.nativeElement.classList, cls) !== -1;
    };

    /**
     * Add CSS class to element
     * @param {String} cls CSS class
     */
    extend.addClass = function (cls) {
        this.nativeElement.classList.add.apply(this.nativeElement.classList, arguments);
    };

    /**
     * Remove CSS class from element
     * @param {String} cls CSS class
     */
    extend.removeClass = function (cls) {
        this.nativeElement.classList.remove(cls);
    };

    /**
     * Toggles CSS class on element
     * @param {String} cls CSS class
     */
    extend.toggleClass = function (cls) {
        this[this.hasClass(cls) ? 'removeClass':'addClass'](cls);
    };

    extend.on = function (event, handler) {
        this.nativeElement.addEventListener(event, handler);
    };

    extend.off = function (event, handler) {
        this.nativeElement.removeEventListener(event, handler);
    };

    /**
     * Hides an element
     * @param {Boolean} [useVisibility=false] use 'visibility' property to hide
     */
    extend.hide = function (useVisibility) {
        this.addClass(useVisibility ? 'invisible' : 'hidden');
    };

    /**
     * Shows an element
     */
    extend.show = function () {
        this.removeClass('hidden');
        this.removeClass('invisible');
    };

    /**
     * Toggles an element
     */
    extend.toggle = function (useVisibility) {
        this.toggleClass(useVisibility ? 'invisible' : 'hidden');
    };

    extend.append = function (element) {
        this.nativeElement.appendChild(element.nativeElement);
    };

    extend.setAttribute = function (name, value) {
        this.nativeElement.setAttribute(name, value);
    }; 
})(Sb.Element.prototype);