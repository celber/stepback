Sb.queryOne = function (query) {
    return new Sb.Element(document.querySelector(query));
};

Sb.queryAll = function (query) {
    return Array.prototype.map.call(
        document.querySelectorAll(query),
        function (el) {
            return new Sb.Element(el);
    });
};