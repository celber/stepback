Kjs.namespace("layout");
Kjs.layout.VSplit = function (_config) {
    Kjs.Container.call(this, _config);
};

(function (self) {
    var baseClass = 'kjs-vsplit-layout';
    Kjs.extend(self, Kjs.Container.prototype);
    self.classList = self.classList.concat([baseClass]);
    
    self.template = `<div></div>`;

    self.renderTo = function (target) {
        Kjs.Container.prototype.renderTo.call(this, target);
    };

    self.afterItemRender = function (item, itemIdx, containerEl) {
        
        item.addClass(baseClass+'-child');

        // append gutter
        // ignore last element so gutter is not added at the end
        if (itemIdx !==  ( this.items.length - 1 )) {
            containerEl.append(self.createSplitBorder());
        }
    }

    self.createSplitBorder = function () {
        return Kjs.Element.render('<div class="'+baseClass+'-gutter">&nbsp;</div>');
    }
})(Kjs.layout.VSplit.prototype);

Kjs.ComponentManager.register('vsplit', Kjs.layout.VSplit);