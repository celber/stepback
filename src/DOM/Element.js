'use strict';

Kjs.Element = function (el, config) {
    this.nativeElement = el;
    Kjs.extend(this.config, config);
}; 

Kjs.Element.render = function (template) {
    var element;
    var tempEl = document.createElement('template');
    var html = template.trim(); // Never return a text node of whitespace as the result
    tempEl.innerHTML = html;
    
    element = new Kjs.Element(document.adoptNode(tempEl.content.firstChild));
    element.template = template;

    return element;
};

(function (extend) {
    extend.id = null;
    extend.nativeElement = null;
    extend.config = {};
    extend.listeners = {};
    extend.template = null;

    extend.hasClass = function (cls) {
        return Array.prototype.indexOf.call(this.nativeElement.classList, cls) !== -1;
    };

    extend.addClass = function (cls) {
        this.nativeElement.classList.add.apply(this.nativeElement.classList, arguments);
    };

    extend.removeClass = function (cls) {
        this.nativeElement.classList.remove(cls);
    };

    extend.toggleClass = function (cls) {
        this[this.hasClass(cls) ? 'removeClass':'addClass'](cls);
    };

    extend.on = function (event, handler) {
        this.nativeElement.addEventListener(event, handler);
    };

    extend.off = function (event, handler) {
        this.nativeElement.removeEventListener(event, handler);
    };

    extend.hide = function (useVisibility) {
        this.addClass(useVisibility ? 'invisible' : 'hidden');
    };

    extend.show = function () {
        this.removeClass('hidden');
        this.removeClass('invisible');
    };

    extend.toggle = function (useVisibility) {
        this.toggleClass(useVisibility ? 'invisible' : 'hidden');
    };

    extend.append = function (element) {
        this.nativeElement.appendChild(element.nativeElement);
    };

    extend.setAttribute = function (name, value) {
        this.nativeElement.setAttribute(name, value);
    }; 
})(Kjs.Element.prototype);