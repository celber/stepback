describe('Fit layout', function () {
    it('does not render immediately', function () {
        const container = new Sb.layout.Fit({
            id: 'fit0',
            items: [{
                componentType: 'component',
                id: 'fitChildComponent0'
            }]
        });

        expect(container.el).toBeUndefined();
    });

    it('renders', function () {
        const container = new Sb.layout.Fit({
            id: 'fit1',
            items: [{
                componentType: 'component',
                id: 'fitChildComponent1'
            }]
        });

        container.renderTo(new Sb.Element(document.body));

        expect(container.el.nativeElement).toBeDefined();
    });
});