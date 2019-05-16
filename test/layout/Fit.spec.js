describe('Fit layout', function () {
    
    it('can be created', function () {
        const container = new Kjs.layout.Fit({
            items: [{
                componentType: 'component',
                id: 'fitChildComponent0'
            }]
        });

        container.renderTo(new Kjs.Element(document.body));

        console.log(container.el.nativeElement.innerWidth);
    });
});