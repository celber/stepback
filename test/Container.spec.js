describe('Container', function () {
    var container;

    beforeAll(function () {
        container = new Kjs.Container({
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
        
    });
});