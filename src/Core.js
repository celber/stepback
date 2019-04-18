function Kjs (options) {
    this.merge(this.options, options);
}

(function (self) {
    self.options = {
        fx: {
            animations: true,
            duration: 1
        },
        map: {
            apiKey: String
        }
    };
    
    self.namespace = function (namespace) {
        var ns = namespace.split('.'), 
            branch = this,
            key, i;
    
        for (i = 0; i < ns.length; ++i) {
            if (!branch[ns[i]]) branch[ns[i]] = {}
            branch = branch[ns[i]];
        }
    };
    
    self.clone = function (source) {
        return Object.assign({}, source);
    };
    
    self.merge = function (target, source) {
        for (var key in source) {
            if (typeof source[key] == 'object') {
                (target[key] === undefined) && (target[key] = {}); 
                this.merge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
    };
    
})(Kjs.prototype);