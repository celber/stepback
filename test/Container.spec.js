describe('Container', function () {
    it('renders items', function () {
        var container = new Kjs.Container({
            template: '<div class="testingContainer"></div>',
            items: [{
                componentType: 'component',
                id: 'childComponent0'
            }, {
                componentType: 'component',
                id: 'childComponent1'
            }]
        });

        container.renderTo(new Kjs.Element(document.body));
        expect(document.querySelector('#childComponent0')).toBeDefined();
    });

    it('can add items', function () {
        var container = new Kjs.Container({
            template: '<div class="testingContainer2"></div>',
            items: [{
                componentType: 'component',
                id: 'childComponent2'
            }, {
                componentType: 'component',
                id: 'childComponent3'
            }]
        });


        container.renderTo(new Kjs.Element(document.body));

        container.addItem({
            componentType: 'component',
            id: 'childComponent4'
        });

        expect(document.querySelector('#childComponent4')).toBeDefined();
    });
});