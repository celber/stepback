Sb.namespace("zendesk");

/**
 * @classdesc Arrow component
 * @extends Sb.Container
 * @class
 * @param {String} [config.orientation] Arrow orientation
 */
Sb.zendesk.Arrow = function (config) {
    Sb.Container.call(this, config);

    this.templateData['orientation'] = config.orientation;
};

(function (/** @alias Sb.zendesk.Arrow.prototype */ self) {
    Sb.extend(self, Sb.Container.prototype);
    self.baseClass = 'sb-zen-arrow';

    /**
     * @override
     */
    self.template = '<ul class="c-arrow c-menu c-arrow--{orientation}"></ul>';
})(Sb.zendesk.Arrow.prototype);


Sb.ComponentManager.register('zen:arrow', Sb.zendesk.Arrow);