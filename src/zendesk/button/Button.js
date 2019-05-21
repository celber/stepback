Kjs.namespace("zendesk");

Kjs.zendesk.Button = function (config) {
    Kjs.Component.call(this, config);

    if (config.text)
};

(function (self) {
    Kjs.extend(extend, Kjs.Component.prototype);

    self.baseClass = 'kjs-zen-button';
    self.text = null;


    self.classList = self.classList.concat([baseClass]);
    
    self.template = `
        <div class="${self.baseClass}-content c-btn">
            
        </div>
    `;

    self.renderTo = function () {
        Kjs.Component.prototype.renderTo.call(this, target);

        
    }
})(Kjs.zendesk.Button.prototype);

Kjs.ComponentManager.register('zen:button', Kjs.zendesk.Button);