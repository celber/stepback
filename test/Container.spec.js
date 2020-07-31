describe('Container', function () {
    it('renders items', function () {
        var container = new Sb.Container({
            template: '<div class="testingContainer"></div>',
            items: [{
                componentType: 'component',
                id: 'childComponent0',
                template: '<div>{body}</div>',
                templateData: {body: 'aaa'}
            }, {
                componentType: 'component',
                id: 'childComponent1',
                template: '<div>{body}</div>',
                templateData: {body: 'bbb'}
            }]
        });

        container.renderTo(new Sb.Element(document.body));
        expect(document.querySelector('#childComponent0')).toBeDefined();
    });

    it('can add items', function () {
        var container = new Sb.Container({
            template: '<div class="testingContainer2"></div>',
            items: [{
                componentType: 'component',
                id: 'childComponent2',
                template: '<div>{body}</div>',
                templateData: {body: 'aaa'}
            }, {
                componentType: 'component',
                id: 'childComponent3',
                template: '<div>{body}</div>',
                templateData: {body: 'bbb'}
            }]
        });

debugger;
        container.renderTo(new Sb.Element(document.body));

        container.addItem({
            componentType: 'component',
            id: 'childComponent4'
        });

        expect(document.querySelector('#childComponent4')).toBeDefined();
    });
});