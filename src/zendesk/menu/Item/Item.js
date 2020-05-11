Sb.namespace("zendesk.menu");

Sb.zendesk.menu.Item = function (config) {
    Sb.zendesk.Button.call(this, config);
    console.log('222')
};

(function (self) {
    Sb.extend(self, Sb.zendesk.Button.prototype);
    self.baseClass = 'sb-zen-menuitem';

    self.template = '<div class="c-menu__item">{text}</div>';
})(Sb.zendesk.menu.Item.prototype);

Sb.ComponentManager.register('zen:menuitem', Sb.zendesk.menu.Item);