Kjs.namespace("layout");
Kjs.layout.VSplit = function (_config) {
    Kjs.Container.call(this, _config);
};

(function (self) {
    var baseClass = 'kjs-vsplit-container';
    Kjs.extend(self, Kjs.Container.prototype);
    self.classList = extend.classList.concat([baseClass]);
    
    self.template = `<div></div>`;

    self.renderTo = function (target) {
        Kjs.Component.prototype.renderTo.call(this, target);
    };

    self.afterItemRender = function (item, itemIdx, containerEl) {
        if (itemIdx !== this.items.length) {
            container.append(self.createSplitBorder);
        }
    }

    self.createSplitBorder = function () {
        return Kjs.Element.render('<div class="'+baseClass+'-splitter">&nbsp;</div>');
    }
})(Kjs.layout.VSplit.prototype);

Kjs.ComponentManager.register('vsplit', Kjs.layout.VSplit);