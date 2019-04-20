'use strict';

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
            branch[ns[i]] = {}
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

Kjs.merge = function (target, source) {
    for (var key in source) {
        if (typeof source[key] == 'object') {
            (target[key] === undefined) && (target[key] = {}); 
            this.merge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }
};
Kjs.ComponentManager = function () {

};

(function(self) {
    self.registry = {};

    self.register = function (type, construct) {
        if (this.registry[type]) {
            new Error('Component '+type+' already exists in Component Managers!');
        }
        this.registry[type] = construct;
    };

    self.get = function (type) {
        if (!this.registry[type]) {
            new Error('Component '+type+' does not exists in Component Managers!');
        }
        return this.registry[type];
    };

    self.create = function (config) {
        var cls = self.get(config.componentType);
        return new cls(config);
    };
}(Kjs.ComponentManager.prototype));

Kjs.ComponentManager = new Kjs.ComponentManager();
Kjs.Component = function (_config) {
    var config = _config || {};
    Kjs.merge(this, config);

    if (!config.id) {
        this.id = Kjs.Component.getId();
    }
};

Kjs.Component.NEXT_ID = 1;

Kjs.Component.getId = function () {
    return "kjs-" + Kjs.Component.NEXT_ID++;
}; 

(function (self) {
    self.id;
    self.el;
    self.rendered = false;
    self.template;
    self.parent;

    self.renderTo = function (target) {
        this.el = Kjs.Element.render(this.template);
        this.el.setAttribute('id', this.id);
        this.parent = target;
        target.append(this.el);
        this.rendered = true;
        return this;
    };
} (Kjs.Component.prototype));

Kjs.ComponentManager.register('component', Kjs.Component);
Kjs.Container = function (config) {
    Kjs.Component.call(this, config);

    this.createItems();
};

(function (self) {
    self.layout = null;
    self.items = [];

    self.append = function (item) {
        this.items.push(item);
    };

    self.createItems = function () {
        for (var i in this.items) {
            this.items[i] = Kjs.ComponentManager.create(this.items[i]);
        }
    };

    Kjs.merge(self, Kjs.Component.prototype);
}(Kjs.Container.prototype));
Kjs.Element = function (el, _config) {
    this.nativeElement = el;
    Kjs.merge(this.config, _config);
}; 

Kjs.Element.render = function (template) {
    var element;
    var tempEl = document.createElement('template');
    var html = template.trim(); // Never return a text node of whitespace as the result
    tempEl.innerHTML = html;
    
    element = new Kjs.Element(tempEl.firstChild);
    element.template = template;

    return element;
};

(function (extend) {
    extend.config = {};
    extend.listeners = {};
    extend.template = null;

    Kjs.merge(extend, {
        id: null,
        nativeElement: null
    });

    extend.hasClass = function (cls) {
        return Array.prototype.indexOf.call(this.nativeElement.classList, cls) !== -1;
    };

    extend.addClass = function (cls) {
        this.nativeElement.classList.add(cls);
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

    extend._detachFromDOM = function () {};
    extend._attachToDOM = function () {};
})(Kjs.Element.prototype);
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
(function (extend) {
    
})(Kjs.namespace("layout"));