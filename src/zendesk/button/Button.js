Sb.namespace("zendesk");

Sb.zendesk.Button = function (config) {
    Sb.Component.call(this, config);

    if (config.primary) {
        this.classList.push("c-btn--primary");
    }

    this.templateData['text'] = config.text;
};

(function (self) {
    Sb.extend(self, Sb.Component.prototype);

    self.baseClass = 'sb-zen-button';
    self.text = null;

    self.classList = self.classList.concat([self.baseClass]);
    
    self.template = '<div class="c-btn">{text}</div>';

    self.renderTo = function (target) {
        Sb.Component.prototype.renderTo.call(this, target);
    };
})(Sb.zendesk.Button.prototype);

Sb.ComponentManager.register('zen:button', Sb.zendesk.Button);