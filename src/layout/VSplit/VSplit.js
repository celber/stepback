Sb.namespace("layout");
/**
 * @class
 * @classdesc Layout which splits components vertically
 * @extends Sb.Container
 */
Sb.layout.VSplit = function (_config) {
    Sb.Container.call(this, _config);
};

(function (/** @alias Sb.layout.VSplit.prototype */ self) {
    var baseClass = 'sb-vsplit-layout';
    Sb.extend(self, Sb.Container.prototype);
    /**
     * @override
     */
    self.classList = self.classList.concat([baseClass]);
    
    /**
     * Default template
     * @override
     */
    self.template = `<div></div>`;

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
        
        item.addClass(baseClass+'-child');

        // append gutter
        // ignore last element so gutter is not added at the end
        if (itemIdx !==  ( this.items.length - 1 )) {
            containerEl.append(self.createSplitBorder());
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
        return Sb.Element.render('<div class="'+baseClass+'-gutter">&nbsp;</div>');
    }
})(Sb.layout.VSplit.prototype);

Sb.ComponentManager.register('vsplit', Sb.layout.VSplit);