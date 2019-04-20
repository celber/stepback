describe('Container', function () {
    var container;

    beforeAll(function () {
        container = new Kjs.Container({
            template: '<div class="testingContainer"></div>',
            items: [{
                componentType: 'component',
                id: 'childComponent0'
            }, {
                componentType: 'component',
                id: 'childComponent1'
            }]
        });
    });

    it('renders items', function () {
        container.renderTo(new Kjs.Element(document.body));

        expect(document.querySelector('#childComponent0')).toBeDefined();
    });
});