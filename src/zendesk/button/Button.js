Kjs.namespace("zendesk");

Kjs.zendesk.Button = function (config) {
    Kjs.Component.call(this, config);

    this.templateData['text'] = config.text;
};

(function (self) {
    Kjs.extend(self, Kjs.Component.prototype);

    self.baseClass = 'kjs-zen-button';
    self.text = null;


    self.classList = self.classList.concat([self.baseClass]);
    
    self.template = `<div class="c-btn">{text}</div>`;

    self.renderTo = function (target) {
        Kjs.Component.prototype.renderTo.call(this, target);
    };
})(Kjs.zendesk.Button.prototype);

Kjs.ComponentManager.register('zen:button', Kjs.zendesk.Button);