Sb.namespace("zendesk");

/**
 * @classdesc Dropdown component
 * @extends Sb.Component
 * @class
 * @param {String} [config.orientation] Arrow orientation
 */
Sb.zendesk.Dropdown = function (config) {
    Sb.Component.call(this, config);

    this.templateData['orientation'] = config.orientation;
};

(function (/** @alias Sb.zendesk.Dropdown.prototype */ self) {
    self.baseClass = 'sb-zen-dropdown';

    /**
     * @override
     */
    self.template = `<div class="c-txt">
      <label class="c-txt__label" for="{id}">{label}</label>
      <select class="c-txt__input c-txt__input--select" id="{id}">
      </select>
    </div>`;

})(Sb.zendesk.Dropdown.prototype);
Sb.extend(Sb.zendesk.Dropdown, Sb.Component);

Sb.ComponentManager.register('zen:dropdown', Sb.zendesk.Dropdown);