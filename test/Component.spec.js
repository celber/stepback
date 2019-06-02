describe('Component', function () {
    var cmp;
    beforeAll(function () {
        cmp = new Sb.Component({
            template: '<div class="checkMe"></div>',
        });
    });

    it('does not render immediately', function() {
        expect(cmp.el).toBeUndefined();
    });

    it('generates unique id for component', function () {
        expect(cmp.id).toBeDefined();
    });

    it('renders', function () {
        var cmp = new Sb.Component({
            id: 'testingComponent',
            template: '<div></div>',
        });

        cmp.renderTo(new Sb.Element(document.body));
        expect(document.getElementById('testingComponent')).toBeDefined();
    });
});