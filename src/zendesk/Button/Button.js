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