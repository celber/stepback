describe('VSplit layout', function () {
    
    it('renders', function () {
        const container = new Kjs.layout.VSplit({
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

        container.renderTo(new Kjs.Element(document.body));

        expect(container.el.nativeElement).toBeDefined();

        expect(container.el.nativeElement.querySelectorAll('.kjs-vsplit-layout-gutter').length).toBe(2);
        expect(container.el.nativeElement.querySelectorAll('.kjs-vsplit-layout-child').length).toBe(3);
    });
});