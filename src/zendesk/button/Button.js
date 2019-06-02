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