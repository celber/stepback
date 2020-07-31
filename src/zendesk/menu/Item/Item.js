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