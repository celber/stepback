//removeIf(!debug)

Sb.namespace('debug');

Sb.debug = {
  stats: {
    componentsCreated: 0,
    initTime: "Not checked. Use <pre>Sb.debug.markEndOfInit();</pre> after app initial script"
  },
  _startOfInit: performance.now(),
  popups: true
};

Sb.debug.popup = function (level, msg) {
  
};

Sb.debug.warn = function (context, msg) {
  console.warn(`${msg}`);
};

Sb.debug.error = function () {
  throw "error handling is not part of Sb.debug module. Use Sb.error instead";
};

Sb.debug.markEndOfInit = function () {
  Sb.debug.stats.initTime = performance.now() - Sb.debug._startOfInit;
}

//endRemoveIf(!debug)