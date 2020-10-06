// @ts-check
'use strict';

/**
 * @classdesc Svarog global object
 * @global
 * @static
 * @class
 */
var Sb = {}; // eslint-disable-line

/**
 * Global config for plugins
 * @constant
 */
Sb.config = {
	fx: {
		animations: true,
		duration: 1,
	},
	map: {
		apiKey: null,
	},
};

/**
 * Create namespace for a class
 * @param {String} namespace dot-separated namespace
 * @example
 *  Sb.namespace('Sb.Foo.Bar')
 */
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

/**
 * clones an object
 * @param {Object} source
 * @returns {Object} cloned object
 */
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

/**
 * Extends an object with given source *recursively*
 * Also merges arrays and nested objects
 * @param {Object} target
 * @param {Object} source
 *
 * @returns null
 */
Sb.merge = function (target, source) {
	for (var key in source) {
		if (source[key] instanceof Array) {
			target[key] === undefined && (target[key] = []);
			target[key] = target[key].concat(source[key]);
		} else if (typeof source[key] == 'object' && typeof target[key] == 'object' && target[key] !== null) {
			target[key] === undefined && (target[key] = {});
			this.merge(target[key], source[key]);
		} else {
			target[key] = source[key];
		}
	}

	return null;
};

/**
 * Extends an object with given source *recursively*
 * Also merges arrays and nested objects
 * @param {Object} target
 * @param {Object} source
 *
 * @returns null
 */
Sb.extend = function (target, source) {
	if (!target.prototype) target.prototype = {};

	Object.setPrototypeOf(target.prototype, source.prototype);
};

/**
 * Extends an object with given source *recursively*
 * Also merges arrays and nested objects
 * @param {Object} target
 * @param {Object} source
 *
 * @returns null
 */
Sb.mixin = function (target, source) {
	Sb.merge(target.prototype, source.prototype);
};

/**
 * Format template string.
 * @param {String} string Template string
 * @param {Object|Map} data Key => value mapped data for template
 *
 * @example
 * Sb.formatString("a {b}", {b: 2})
 *
 * @returns {String} compiled string
 */
Sb.formatString = function (string, data) {
	for (var key in data) {
		string = string.replace('{' + key + '}', data[key]);
	}

	return string;
};

//removeIf(!debug)
'use strict';

Sb.namespace('debug');

/**
 * @classdesc Debugging utilities
 * @class
 * @singleton
 */
Sb.debug = (new function () {
  /**
   * Current runtime statistics
   */
  this.stats = {
    componentsCreated: 0,
    /**
     * @type Number | String
     */
    initTime: 'Not checked. Use <pre>Sb.debug.markEndOfInit();</pre> after app initial script',
  };

  this._startOfInit = performance.now();
  /**
   * Container wrapper for nested components
   */
  this.popups = true;

  this.level = 0x15;
  this.NONE = 0x0;
  this.ERROR = 0x1;
  this.WARN = 0x3;
  this.INFO = 0x7;
  this.DEBUG = 0x15;

  return this;
}());


(function (/** @alias Sb.debug.prototype */ self) {
  self.popup = function (level, msg) {};

  self.warn = function (context, msg) {
    console.warn(`🤒 ${msg}`);
  };

  self.error = function () {
    throw '🐄 error handling is not part of Sb.debug module. Use Sb.error instead';
  };

  self.markEndOfInit = function () {
    Sb.debug.stats.initTime = performance.now() - Sb.debug._startOfInit;
  };

  self.info = function (context, msg) {
    console.info(`${msg}`);
  };

  self.log = function (context, msg) {
    console.log(`${msg}`);
  };
}(Sb.debug.constructor.prototype));

Sb.debug.log(null, 'Debug tools are ready');

//endRemoveIf(!debug)

Sb.namespace('mixin');

/**
 * @classdesc Adds event handling
 * @class
 */
Sb.mixin.Observable = function () {
  /**
   * @private
   */
  this.listeners = {};
};

(function (/** @alias Sb.mixin.Observable.prototype */ self) {
  /**
   * Attach event callback
   * @param {String} eventName
   * @param {Function} callback
   * @param {Object} [_options]
   *
   * @returns {Symbol} listener Id
   */
  self.on = function (eventName, callback, _options) {
    var eventId = Symbol();

    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push({
      eventId: eventId,
      callback: callback,
      options: _options || {},
    });

    return eventId;
  };

  /**
   * Dettach event by its name+callback or symbol returned by .on
   * @param {String|Symbol} eventName
   * @param {Function} [_callback]
   */
  self.off = function (eventName, _callback) {};

  /**
   * Fire event
   * @param {String} eventName
   * @param {Object} [_values]
   */
  self.fire = function (eventName, _values) {
    var i, event;

    if (this.listeners[eventName]) {
      for (i in this.listeners[eventName]) {
        event = this.listeners[eventName][i];
        event.callback(_values);
      }
    }
  };
})(Sb.mixin.Observable.prototype);



Sb.Store = function () {
  
}
'use strict';
/**
 * Component Manager
 * @class
 * @static
 * @hideconstructor
 */
Sb.ComponentManager = function () {

};

(function(/** @alias Sb.ComponentManager.prototype */ self) {
    self.registry = {};

    /**
     * Register new component type
     * @param {String} type component ctype alias
     * @param {Function} construct component constructor
     */
    self.register = function (type, construct) {
        if (this.registry[type]) {
            new Error('Component '+type+' already exists in Component Managers!');
        }
        this.registry[type] = construct;
    };

    /**
     * Get constructor for given ctype
     * @param {String} ctype Component class alias
     * @returns {Function} Component constructor
     */
    self.get = function (ctype) {
        if (!this.registry[ctype]) {
            new Error('Component '+ctype+' does not exists in Component Managers!');
        }
        return this.registry[ctype];
    };

    /**
     * Create component from config containing 'ctype'
     * @param {Object} config
     * @returns {Sb.Component} created component 
     */
    self.create = function (config) {
        var cls = self.get(config.componentType);
        return new cls(config);
    };
}(Sb.ComponentManager.prototype));

Sb.ComponentManager = new Sb.ComponentManager();
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
   * @type {Boolean}s
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
  return 'sb-' + Sb.Component.NEXT_ID++;
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
   * @type Sb.Component
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
    this.classList = this.classList.filter(function (value) {
      return value !== cls;
    });
  };

  /**
   * fired before component is rendered
   * @virtual
   */
  // eslint-disable-next-line no-unused-vars
  self.beforeRender = function (target) {};
  /**
   * fired after component is rendered
   * @virtual
   */
  // eslint-disable-next-line no-unused-vars
  self.afterRender = function (target) {};
})(Sb.Component.prototype);

Sb.mixin(Sb.Component, Sb.mixin.Observable);

Sb.ComponentManager.register('component', Sb.Component);

'use strict';
/**
 * @classdesc Container component which has layout and nested components
 * @class
 * @extends Sb.Component
 */
Sb.Container = function (config) {
  Sb.Component.call(this, config);

  this.baseClass = 'sb-container';

  this.classList.push(this.baseClass);

  /**
   * Layout instance
   */
  this.layout = null;

  /**
   * Container wrapper for nested components
   * @private
   */
  this.containerEl = this.containerEl || null;

  /**
   * Nested components and containers
   * @type Array<Sb.Component|Sb.Container>
   */
  this.items = this.items || [];

  for (var i in this.items) {
    this.items[i] = this.createItem(this.items[i]);
  }
};

(function (/** @alias Sb.Container.prototype */ self) {
  /**
   * Adds item to container
   * @param {Sb.Component} item
   */
  self.addItem = function (item) {
    this.items.push(this.createItem(item));
    this.renderTo(this.parent);
  };

  /**
   * Returns container wrapper element
   * @returns {HTMLElement} wrapper element
   */
  self.getContainerEl = function () {
    return this.el;
  };

  /**
   * Creates item instance
   * @private
   */
  self.createItem = function (itemConfig) {
    return Sb.ComponentManager.create(itemConfig);
  };

  /**
   * Renders itself and all children to given target
   * @override
   * @param {Sb.Container|HTMLElement} target
   */
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

  /**
   * Renders item instance
   * @private
   */
  self.renderItem = function (item, containerEl) {
    item.rendered || item.renderTo(containerEl);
    return item;
  };

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  self.beforeItemRender = function (item, itemIdx, containerEl) {};

  /**
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  self.afterItemRender = function (item, itemIdx, containerEl) {};
})(Sb.Container.prototype);
Sb.extend(Sb.Container, Sb.Component);

Sb.ComponentManager.register('container', Sb.Container);

'use strict';
/**
 * @classdesc Web Worker which supports inline functions and script files
 * @class
 * @param {Function|String} body Worker function or script location
 * @extends Sb.mixin.Observable
 */
Sb.Worker = function (body) {
    var blobURL;

    if (typeof body == "function") {
      blobURL = URL.createObjectURL( new Blob(
        [ '(', body.toString(),')()' ],
        { type: 'application/javascript' } )
      );

      this.worker = new Worker( blobURL );

      // delete blobUrl from memory
      URL.revokeObjectURL( blobURL );
    } else {
      this.worker = new Worker( body );
    }

    Sb.mixin.Observable.call(this);

    this.worker.onmessage = this._onMessage.bind(this);
};


/**
 * Message received from worker.
 *
 * @event Sb.Worker#message
 * @type {*}
 */

(function (/** @alias Sb.Worker.prototype */ self) {

    /**
     * Sends message to worker thread
     * @param {*} message Payload for a worker
     */
    self.post = function (message) {
      this.worker.postMessage(message);
    };

    /**
     * Terminates worker thread
     */
    self.terminate = function () {
        return this.worker.terminate();
    };

    /**
     * Internal event handler
     * @private
     * @fires message
     */
    self._onMessage = function (msg) {
      return this.fire('message', msg);
  };

}(Sb.Worker.prototype));

Sb.mixin(Sb.Worker, Sb.mixin.Observable);
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
	// eslint-disable-next-line no-unused-vars
	extend.addClass = function (_cls) {
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
		this[this.hasClass(cls) ? 'removeClass' : 'addClass'](cls);
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
Sb.namespace("layout");
/**
 * @classdesc Layout for one element, it stretches it to fit whole container
 * @class
 * @augments Sb.Container
 * @param {Object} [_config={}] config
 */
Sb.layout.Fit = function (_config) {
  Sb.Container.call(this, _config);
  
  this.baseClass = 'sb-fit-layout';

  this.classList = this.classList.push(this.baseClass);
    
  /**
   * Default template
   * @override
   */
  this.template = `<div></div>`;
};

(function (/** @alias Sb.layout.Fit.prototype */ extend) {
    
})(Sb.layout.Fit.prototype);

Sb.extend(Sb.layout.Fit, Sb.Container);
Sb.ComponentManager.register('fit', Sb.layout.Fit);
Sb.namespace("layout");
/**
 * @class
 * @classdesc Layout which splits components vertically
 * @extends Sb.Container
 */
Sb.layout.VSplit = function (_config) {
    Sb.Container.call(this, _config);

    this.baseClass = 'sb-vsplit-layout';

    /**
     * @override
     */
    this.classList = this.classList.push(this.baseClass);
    
    /**
     * Default template
     * @override
     */
    this.template = `<div></div>`;
};

(function (/** @alias Sb.layout.VSplit.prototype */ self) {

    /**
     * @override
     */
    self.renderTo = function (target) {
        Sb.Container.prototype.renderTo.call(this, target);
    };

    /**
     * Is fired when child component is rendered
     */
    self.afterItemRender = function (item, itemIdx, containerEl) {
        
        item.addClass(this.baseClass+'-child');

        // append gutter
        // ignore last element so gutter is not added at the end
        if (itemIdx !==  ( this.items.length - 1 )) {
            containerEl.append(this.createSplitBorder());
        }
    };

    /**
     * @override
     */
    self.afterRender = function (target) {};

    /**
     * Create split border element
     * @returns {Sb.Element}
     */
    self.createSplitBorder = function () {
        return Sb.Element.render('<div class="'+this.baseClass+'-gutter">&nbsp;</div>');
    }
})(Sb.layout.VSplit.prototype);
Sb.extend(Sb.layout.VSplit, Sb.Container);

Sb.ComponentManager.register('vsplit', Sb.layout.VSplit);
Sb.namespace("zendesk");

Sb.zendesk.Button = function (config) {
    Sb.Component.call(this, config);

    this.baseClass = 'sb-zen-button';

    this.classList.push(this.baseClass);

    this.text = config.text;
    this.handler = function () {};
    
    this.template = `<div class="c-btn">{text}</div>`;

    if (config.primary) {
        this.classList.push("c-btn--primary");
    }

    if (config.handler) {
        this.handler = config.handler;
    }

    this.templateData['text'] = this.text;
};

(function (self) {

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
Sb.extend(Sb.zendesk.Button, Sb.Component);

Sb.ComponentManager.register('zen:button', Sb.zendesk.Button);
Sb.namespace("zendesk");

/**
 * @classdesc Arrow component
 * @extends Sb.Container
 * @class
 * @param {String} [config.orientation] Arrow orientation
 */
Sb.zendesk.Arrow = function (config) {
    Sb.Container.call(this, config);

    this.templateData['orientation'] = config.orientation;
};

(function (/** @alias Sb.zendesk.Arrow.prototype */ self) {
    self.baseClass = 'sb-zen-arrow';

    /**
     * @override
     */
    self.template = '<ul class="c-arrow c-menu c-arrow--{orientation}"></ul>';
})(Sb.zendesk.Arrow.prototype);
Sb.extend(Sb.zendesk.Arrow, Sb.Container);

Sb.ComponentManager.register('zen:arrow', Sb.zendesk.Arrow);
Sb.namespace("zendesk.menu");

Sb.zendesk.menu.Item = function (config) {
    Sb.zendesk.Button.call(this, config);
    console.log('222')
};

(function (self) {
    self.baseClass = 'sb-zen-menuitem';

    self.template = '<div class="c-menu__item">{text}</div>';
})(Sb.zendesk.menu.Item.prototype);
Sb.extend(Sb.zendesk.menu.Item, Sb.zendesk.Button);

Sb.ComponentManager.register('zen:menuitem', Sb.zendesk.menu.Item);
Sb.namespace("zendesk");

Sb.zendesk.Avatar = function (config) {
    Sb.Container.call(this, config);

    this.templateData['system'] = config.system ? 'c-avatar--system' : '' ;
    this.templateData['size'] = config.size || 'md';
    this.templateData['alt'] = config.alt || '';
    this.templateData['src'] = config.src;
};

(function (self) {
    self.baseClass = 'sb-zen-avatar';

    self.template = `<figure class="c-avatar {system} c-avatar--size">
        <img alt='' src={src}>
    </figure> `;
})(Sb.zendesk.Avatar.prototype);
Sb.extend(Sb.zendesk.Avatar, Sb.Component);

Sb.ComponentManager.register('zen:avatar', Sb.zendesk.Avatar);
//# sourceMappingURL=sb.js.map
