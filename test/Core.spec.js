describe('Core', function() {
    it('merges object', function () {
        var a = {
            foo: 1,
            bar: {
                baz: 2,
                taz: 3 
            }
        };

        Sb.merge(a, {
            bar: {
                taz: 99
            }
        });

        // provided key was updated
        expect(a.bar.taz).toBe(99);
        // but default value was preserved
        expect(a.bar.baz).toBe(2);
    });

    it('creates namespace', function () {
        (function (self){
            self.a = 2;
        })(Sb.namespace('test.namespace'));
        expect(Sb.test.namespace).toEqual({a:2});
    });

    it('clones objects', function() {
        var a,b;
        a = {
            foo: 'bar'
        };

        b = Sb.clone(a);
        b.foo = 'baz';

        expect(a.foo).toBe('bar');
        expect(b.foo).toBe('baz');
    });
});