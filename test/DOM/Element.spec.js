describe('HTMLElement wrapper (Sb.Element)', function () {
    var fooDiv, barDiv;

    beforeAll(function () {
        fooDiv = document.createElement('DIV');
        barDiv = document.createElement('DIV');
        fooDiv.id = 'foo';
        fooDiv.classList.add('testClass');
        fooDiv.classList.add('removeMe');
        barDiv.id = 'bar';

        document.body.appendChild(fooDiv);
        document.body.appendChild(barDiv);
    });

    afterAll(function () {
        fooDiv.remove();
        barDiv.remove();
    });

    it('renders template', function () {
        var template = "<div id='abc' class='testMe'></div>";
        var component = Sb.Element.render(template);
        
        expect(component.hasClass('testMe')).toBe(true);
    });

    it('detects class', function () {
        var foo = Sb.queryOne('#foo');
        expect(foo.hasClass('testClass')).toBe(true);
    });

    it('adds class to element', function () {
        var foo = Sb.queryOne('#foo');
        expect(foo.hasClass('addMe')).toBe(false);
        foo.addClass('addMe');
        expect(foo.hasClass('addMe')).toBe(true);
    });

    it('removes class from element', function() {
        var foo = Sb.queryOne('#foo');
        expect(foo.hasClass('removeMe')).toBe(true);
        foo.removeClass('removeMe');
        expect(foo.hasClass('removeMe')).toBe(false);
    });

    it('toggles class on element', function () {
        var foo = Sb.queryOne('#foo');
        expect(foo.hasClass('toggleMe')).toBe(false);
        foo.toggleClass('toggleMe');
        expect(foo.hasClass('toggleMe')).toBe(true);
        foo.toggleClass('toggleMe');
        expect(foo.hasClass('toggleMe')).toBe(false);
    });

    it('hides element', function () {
        var foo = Sb.queryOne('#foo');
        foo.hide();
        expect(foo.hasClass('hidden')).toBe(true);
        foo.hide(true);
        expect(foo.hasClass('invisible')).toBe(true);
    });

    it('shows element', function () {
        var foo = Sb.queryOne('#foo');
        foo.hide();
        foo.hide(true);
        foo.show();
        expect(foo.hasClass('hidden')).toBe(false);
        expect(foo.hasClass('invisible')).toBe(false);
    });

    it('toggles element\'s visibility', function () {
        var foo = Sb.queryOne('#bar');
        foo.toggle();
        expect(foo.hasClass('hidden')).toBe(true);
        foo.show();
        foo.toggle(true);
        expect(foo.hasClass('invisible')).toBe(true);
        foo.toggle(true);
        expect(foo.hasClass('invisible')).toBe(false);
    });

    it('binds/removes event listener', function () {
        var foo = Sb.queryOne('#foo');
        var changeMe = 0;
        var handler = function() {
            changeMe += 1;
        }

        foo.on('click', handler);
        foo.nativeElement.click();
        expect(changeMe).toBe(1);
        foo.off('click', handler);
        foo.nativeElement.click();
        expect(changeMe).toBe(1);
    });
});