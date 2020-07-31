Sb.namespace("layout");
/**
 * @class
 * @classdesc Layout which splits components vertically
 * @extends Sb.Container
 */
Sb.layout.VSplit = function (_config) {
    Sb.Container.call(this, _config);

    this.baseClass = 'sb-vsplit-layout';

    /**
     * @override
     */
    this.classList = this.classList.push(this.baseClass);
    
    /**
     * Default template
     * @override
     */
    this.template = `<div></div>`;
};

(function (/** @alias Sb.layout.VSplit.prototype */ self) {

    /**
     * @override
     */
    self.renderTo = function (target) {
        Sb.Container.prototype.renderTo.call(this, target);
    };

    /**
     * Is fired when child component is rendered
     */
    self.afterItemRender = function (item, itemIdx, containerEl) {
        
        item.addClass(this.baseClass+'-child');

        // append gutter
        // ignore last element so gutter is not added at the end
        if (itemIdx !==  ( this.items.length - 1 )) {
            containerEl.append(this.createSplitBorder());
        }
    };

    /**
     * @override
     */
    self.afterRender = function (target) {};

    /**
     * Create split border element
     * @returns {Sb.Element}
     */
    self.createSplitBorder = function () {
        return Sb.Element.render('<div class="'+this.baseClass+'-gutter">&nbsp;</div>');
    }
})(Sb.layout.VSplit.prototype);
Sb.extend(Sb.layout.VSplit, Sb.Container);

Sb.ComponentManager.register('vsplit', Sb.layout.VSplit);