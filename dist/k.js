'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Kjs = {};
Kjs.config = {
  fx: {
    animations: true,
    duration: 1
  },
  map: {
    apiKey: String
  }
};

Kjs.namespace = function (namespace) {
  var ns = namespace.split('.'),
      branch = this,
      i;

  for (i = 0; i < ns.length; ++i) {
    if (!branch[ns[i]]) {
      branch[ns[i]] = {};
    }

    branch = branch[ns[i]];
  }

  return branch;
};

Kjs.clone = function (source) {
  var target = Object();

  for (var nextKey in source) {
    // Avoid bugs when hasOwnProperty is shadowed
    if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
      target[nextKey] = source[nextKey];
    }
  }

  return target;
};

Kjs.extend = function (target, source) {
  for (var key in source) {
    if (source[key] instanceof Array) {
      target[key] === undefined && (target[key] = []);
      target[key] = target[key].concat(source[key]);
    } else if (_typeof(source[key]) == 'object' && _typeof(target[key]) == 'object' && target[key] !== null) {
      target[key] === undefined && (target[key] = {});
      this.extend(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
};

Kjs.formatString = function (string, data) {
  for (var key in data) {
    string = string.replace("{" + key + "}", data[key]);
  }

  return string;
};
"use strict";

Kjs.ComponentManager = function () {};

(function (self) {
  self.registry = {};

  self.register = function (type, construct) {
    if (this.registry[type]) {
      new Error('Component ' + type + ' already exists in Component Managers!');
    }

    this.registry[type] = construct;
  };

  self.get = function (type) {
    if (!this.registry[type]) {
      new Error('Component ' + type + ' does not exists in Component Managers!');
    }

    return this.registry[type];
  };

  self.create = function (config) {
    var cls = self.get(config.componentType);
    return new cls(config);
  };
})(Kjs.ComponentManager.prototype);

Kjs.ComponentManager = new Kjs.ComponentManager();
"use strict";

Kjs.Component = function (_config) {
  var config = _config || {};
  Kjs.extend(this, config);

  if (!config.id) {
    this.id = Kjs.Component.getId();
  }
};

Kjs.Component.NEXT_ID = 1;

Kjs.Component.getId = function () {
  return "kjs-" + Kjs.Component.NEXT_ID++;
};

(function (self) {
  var baseClass = 'kjs-component';
  self.id;
  self.el;
  self.rendered = false;
  self.parent;
  self.baseClass = baseClass;
  self.classList = [baseClass];
  self.template = '<div></div>';
  self.templateData = {};

  self.renderTo = function (target) {
    this.beforeRender(target);
    this.el = this.el || Kjs.Element.render(Kjs.formatString(this.template, this.templateData));
    this.el.setAttribute('id', this.id);

    if (this.classList.length) {
      this.el.addClass.apply(this.el, this.classList);
    }

    this.parent = target;
    target.append(this.el);
    this.rendered = true;
    this.afterRender(target);
    return this;
  };

  self.addClass = function (cls) {
    this.el.addClass(cls);
    this.classList.push(cls);
  };

  self.removeClass = function (cls) {
    this.el.removeClass(cls);
    this.classList = this.classList.filter(function (value) {
      return value !== cls;
    });
  }; // abstract


  self.beforeRender = function () {};

  self.afterRender = function () {};
})(Kjs.Component.prototype);

Kjs.ComponentManager.register('component', Kjs.Component);
"use strict";

Kjs.Container = function (config) {
  Kjs.Component.call(this, config);

  for (var i in this.items) {
    this.items[i] = this.createItem(this.items[i]);
  }
};

(function (self) {
  Kjs.extend(self, Kjs.Component.prototype);
  self.classList = self.classList.concat(['kjs-container']);
  self.layout = null;
  self.containerEl = null;
  self.items = [];

  self.addItem = function (item) {
    this.items.push(this.createItem(item));
    this.renderTo(this.parent);
  };

  self.getContainerEl = function () {
    return this.el;
  };

  self.createItem = function (itemConfig) {
    return Kjs.ComponentManager.create(itemConfig);
  };

  self.renderTo = function (target) {
    var suspendItemRender = false;
    Kjs.Component.prototype.renderTo.call(this, target);
    this.containerEl = this.getContainerEl();

    for (var i = 0; i < this.items.length; ++i) {
      suspendItemRender = !!this.beforeItemRender(this.items[i], i, this.containerEl);
      suspendItemRender || this.renderItem(this.items[i], this.containerEl);
      suspendItemRender || this.afterItemRender(this.items[i], i, this.containerEl);
    }
  };

  self.renderItem = function (item, containerEl) {
    item.rendered || item.renderTo(containerEl);
    return item;
  };

  self.beforeItemRender = function (item, itemIdx, containerEl) {// abstract
  };

  self.afterItemRender = function (item, itemIdx, containerEl) {// abstract
  };
})(Kjs.Container.prototype);

Kjs.ComponentManager.register('container', Kjs.Container);
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
    this[this.hasClass(cls) ? 'removeClass' : 'addClass'](cls);
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
"use strict";

Kjs.queryOne = function (query) {
  return new Kjs.Element(document.querySelector(query));
};

Kjs.queryAll = function (query) {
  return Array.prototype.map.call(document.querySelectorAll(query), function (el) {
    return new Kjs.Element(el);
  });
};
"use strict";

Kjs.namespace("layout");

Kjs.layout.Fit = function (_config) {
  Kjs.Container.call(this, _config);
};

(function (extend) {
  Kjs.extend(extend, Kjs.Container.prototype);
  extend.classList = extend.classList.concat(['kjs-fit-layout']);
  extend.template = "<div></div>";
})(Kjs.layout.Fit.prototype);

Kjs.ComponentManager.register('fit', Kjs.layout.Fit);
"use strict";

Kjs.namespace("layout");

Kjs.layout.VSplit = function (_config) {
  Kjs.Container.call(this, _config);
};

(function (self) {
  var baseClass = 'kjs-vsplit-container';
  Kjs.extend(self, Kjs.Container.prototype);
  self.classList = self.classList.concat([baseClass]);
  self.template = "<div></div>";

  self.renderTo = function (target) {
    Kjs.Container.prototype.renderTo.call(this, target);
  };

  self.afterItemRender = function (item, itemIdx, containerEl) {
    // ignore last element so gutter is not added at the end
    if (itemIdx !== this.items.length - 1) {
      containerEl.append(self.createSplitBorder());
    }
  };

  self.createSplitBorder = function () {
    return Kjs.Element.render('<div class="' + baseClass + '-gutter">&nbsp;</div>');
  };
})(Kjs.layout.VSplit.prototype);

Kjs.ComponentManager.register('vsplit', Kjs.layout.VSplit);
"use strict";

Kjs.namespace("zendesk");

Kjs.zendesk.Button = function (config) {
  Kjs.Component.call(this, config);

  if (config.primary) {
    this.classList.push("c-btn--primary");
  }

  this.templateData['text'] = config.text;
};

(function (self) {
  Kjs.extend(self, Kjs.Component.prototype);
  self.baseClass = 'kjs-zen-button';
  self.text = null;
  self.classList = self.classList.concat([self.baseClass]);
  self.template = '<div class="c-btn">{text}</div>';

  self.renderTo = function (target) {
    Kjs.Component.prototype.renderTo.call(this, target);
  };
})(Kjs.zendesk.Button.prototype);

Kjs.ComponentManager.register('zen:button', Kjs.zendesk.Button);
//# sourceMappingURL=k.js.map
