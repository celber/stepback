describe('VSplit layout', function () {
    
    it('renders', function () {
        const container = new Sb.layout.VSplit({
            id: 'vsplit0',
            items: [{
                componentType: 'component',
                id: 'vsplitChildComponent0'
            },{
                componentType: 'component',
                id: 'vsplitChildComponent1'
            },{
                componentType: 'component',
                id: 'vsplitChildComponent2'
            }]
        });

        container.renderTo(new Sb.Element(document.body));

        expect(container.el.nativeElement).toBeDefined();
        expect(container.el.nativeElement.querySelectorAll('.sb-vsplit-layout-gutter').length).toBe(2);
        expect(container.el.nativeElement.querySelectorAll('.sb-vsplit-layout-child').length).toBe(3);
    });
});