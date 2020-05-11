Sb.namespace("zendesk");

Sb.zendesk.Avatar = function (config) {
    Sb.Container.call(this, config);

    this.templateData['system'] = config.system ? 'c-avatar--system' : '' ;
    this.templateData['size'] = config.size || 'md';
    this.templateData['alt'] = config.alt || '';
    this.templateData['src'] = config.src;
};

(function (self) {
    Sb.extend(self, Sb.Component.prototype);
    self.baseClass = 'sb-zen-avatar';

    self.template = `<figure class="c-avatar {system} c-avatar--size">
        <img alt='' src={src}>
    </figure> `;
})(Sb.zendesk.Avatar.prototype);


Sb.ComponentManager.register('zen:avatar', Sb.zendesk.Avatar);