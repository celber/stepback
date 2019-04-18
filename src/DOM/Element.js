Kjs.Element = {
    id: null,
    nativeElement: null,
    options: {},
    listeners: null
};

(function (extend) {
    extend.constructor = function (el, _options) {
        this.nativeElement = el;
        this.options = Kjs.merge(this.options, _options);
    };

    extend.addClass = function (cls) {

    };

    extend.removeClass = function (cls) {

    };

    extend.toggleClass = function (cls) {

    };

    extend.on = function (event, handler, options) {

    };

    extend.hide = function (useVisibility) {

    };

    extend.show = function () {

    };

    extend.toggle = function (useVisibility) {

    };

    extend._detachFromDOM = function () {};
    extend._attachToDOM = function () {};
})(Kjs.Element);