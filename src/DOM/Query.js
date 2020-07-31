/**
 * Queries one first element and wrapps it into {@link Sb.Element}
 * @static
 * @param {String} query CSS query string
 * @returns {Sb.Element}
 */
Sb.queryOne = function (query) {
    return new Sb.Element(document.querySelector(query));
};

/**
 * Queries many elements and wrapps it into {@link Sb.Element}
 * @static
 * @param {String} query CSS query string
 * @returns {Array<Sb.Element>}
 */
Sb.queryAll = function (query) {
    return Array.prototype.map.call(
        document.querySelectorAll(query),
        function (el) {
            return new Sb.Element(el);
    });
};