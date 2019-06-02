'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Sb = {};
Sb.config = {
  fx: {
    animations: true,
    duration: 1
  },
  map: {
    apiKey: String
  }
};

Sb.namespace = function (namespace) {
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

Sb.clone = function (source) {
  var target = Object();

  for (var nextKey in source) {
    // Avoid bugs when hasOwnProperty is shadowed
    if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
      target[nextKey] = source[nextKey];
    }
  }

  return target;
};

Sb.extend = function (target, source) {
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

Sb.formatString = function (string, data) {
  for (var key in data) {
    string = string.replace("{" + key + "}", data[key]);
  }

  return string;
};
"use strict";

Sb.ComponentManager = function () {};

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
})(Sb.ComponentManager.prototype);

Sb.ComponentManager = new Sb.ComponentManager();
"use strict";

Sb.Component = function (_config) {
  var config = _config || {};
  Sb.extend(this, config);

  if (!config.id) {
    this.id = Sb.Component.getId();
  }
};

Sb.Component.NEXT_ID = 1;

Sb.Component.getId = function () {
  return "sb-" + Sb.Component.NEXT_ID++;
};

(function (self) {
  var baseClass = 'sb-component';
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
    this.el = this.el || Sb.Element.render(Sb.formatString(this.template, this.templateData));
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


  self.beforeRender = function (target) {};

  self.afterRender = function (target) {};
})(Sb.Component.prototype);

Sb.ComponentManager.register('component', Sb.Component);
"use strict";

Sb.Container = function (config) {
  Sb.Component.call(this, config);

  for (var i in this.items) {
    this.items[i] = this.createItem(this.items[i]);
  }
};

(function (self) {
  Sb.extend(self, Sb.Component.prototype);
  self.classList = self.classList.concat(['sb-container']);
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
    return Sb.ComponentManager.create(itemConfig);
  };

  self.renderTo = function (target) {
    var suspendItemRender = false;
    Sb.Component.prototype.renderTo.call(this, target);
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
})(Sb.Container.prototype);

Sb.ComponentManager.register('container', Sb.Container);
'use strict';

Sb.Element = function (el, config) {
  this.nativeElement = el;
  Sb.extend(this.config, config);
};

Sb.Element.render = function (template) {
  var element;
  var tempEl = document.createElement('template');
  var html = template.trim(); // Never return a text node of whitespace as the result

  tempEl.innerHTML = html;
  element = new Sb.Element(document.adoptNode(tempEl.content.firstChild));
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
})(Sb.Element.prototype);
"use strict";

Sb.queryOne = function (query) {
  return new Sb.Element(document.querySelector(query));
};

Sb.queryAll = function (query) {
  return Array.prototype.map.call(document.querySelectorAll(query), function (el) {
    return new Sb.Element(el);
  });
};
"use strict";

Sb.namespace("layout");

Sb.layout.Fit = function (_config) {
  Sb.Container.call(this, _config);
};

(function (extend) {
  Sb.extend(extend, Sb.Container.prototype);
  extend.classList = extend.classList.concat(['sb-fit-layout']);
  extend.template = "<div></div>";
})(Sb.layout.Fit.prototype);

Sb.ComponentManager.register('fit', Sb.layout.Fit);
"use strict";

Sb.namespace("layout");

Sb.layout.VSplit = function (_config) {
  Sb.Container.call(this, _config);
};

(function (self) {
  var baseClass = 'sb-vsplit-layout';
  Sb.extend(self, Sb.Container.prototype);
  self.classList = self.classList.concat([baseClass]);
  self.template = "<div></div>";

  self.renderTo = function (target) {
    Sb.Container.prototype.renderTo.call(this, target);
  };

  self.afterItemRender = function (item, itemIdx, containerEl) {
    item.addClass(baseClass + '-child'); // append gutter
    // ignore last element so gutter is not added at the end

    if (itemIdx !== this.items.length - 1) {
      containerEl.append(self.createSplitBorder());
    }
  };

  self.afterRender = function (target) {
    console.log(target);
  };

  self.createSplitBorder = function () {
    return Sb.Element.render('<div class="' + baseClass + '-gutter">&nbsp;</div>');
  };
})(Sb.layout.VSplit.prototype);

Sb.ComponentManager.register('vsplit', Sb.layout.VSplit);
"use strict";

Sb.namespace("zendesk");

Sb.zendesk.Button = function (config) {
  Sb.Component.call(this, config);

  if (config.primary) {
    this.classList.push("c-btn--primary");
  }

  if (config.handler) {
    this.handler = config.handler;
  }

  this.templateData['text'] = config.text;
};

(function (self) {
  Sb.extend(self, Sb.Component.prototype);
  self.baseClass = 'sb-zen-button';
  self.text = null;

  self.handler = function () {};

  self.classList = self.classList.concat([self.baseClass]);
  self.template = '<div class="c-btn">{text}</div>';

  self.renderTo = function (target) {
    Sb.Component.prototype.renderTo.call(this, target);
  };

  self.setHandler = function (handler) {
    var me = this;
    me.el.off('click', me.handler);

    me.handler = function () {
      handler.apply(me);
    };

    me.el.on('click', me.handler);
  };

  self.afterRender = function (target) {
    this.setHandler(this.handler);
  };
})(Sb.zendesk.Button.prototype);

Sb.ComponentManager.register('zen:button', Sb.zendesk.Button);
//# sourceMappingURL=sb.js.map
