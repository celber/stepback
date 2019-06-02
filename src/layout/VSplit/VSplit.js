Sb.namespace("layout");
Sb.layout.VSplit = function (_config) {
    Sb.Container.call(this, _config);
};

(function (self) {
    var baseClass = 'sb-vsplit-layout';
    Sb.extend(self, Sb.Container.prototype);
    self.classList = self.classList.concat([baseClass]);
    
    self.template = `<div></div>`;

    self.renderTo = function (target) {
        Sb.Container.prototype.renderTo.call(this, target);
    };

    self.afterItemRender = function (item, itemIdx, containerEl) {
        
        item.addClass(baseClass+'-child');

        // append gutter
        // ignore last element so gutter is not added at the end
        if (itemIdx !==  ( this.items.length - 1 )) {
            containerEl.append(self.createSplitBorder());
        }
    };

    self.afterRender = function (target) {
        console.log(target);
    };

    self.createSplitBorder = function () {
        return Sb.Element.render('<div class="'+baseClass+'-gutter">&nbsp;</div>');
    }
})(Sb.layout.VSplit.prototype);

Sb.ComponentManager.register('vsplit', Sb.layout.VSplit);