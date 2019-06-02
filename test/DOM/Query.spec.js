describe('DOM Query', function () {
    var fooDiv, barDiv;

    beforeAll(function () {
        fooDiv = document.createElement('DIV');
        barDiv = document.createElement('DIV');
        fooDiv.classList.add('testClass');
        barDiv.classList.add('testClass');
        fooDiv.id = 'testId';

        document.body.appendChild(fooDiv);
        document.body.appendChild(barDiv);
    });

    afterAll(function () {
        fooDiv.remove();
        barDiv.remove();
    });

    it('finds one element', function() {
        var foo = Sb.queryOne('.testClass');
        expect(foo.nativeElement.id).toBe('testId');
    });

    it('finds many elements', function () {
        var foo = Sb.queryAll('.testClass');
        expect(foo.length).toBe(2);
    });
});