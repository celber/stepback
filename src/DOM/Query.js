Kjs.queryOne = function (query) {
    return new Kjs.Element(document.querySelector(query));
};

Kjs.queryAll = function (query) {
    return Array.prototype.map.call(
        document.querySelectorAll(query),
        function (el) {
            return new Kjs.Element(el);
    });
};