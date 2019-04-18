describe('Core', function() {
    var sandboxedKjs;
    beforeEach(function () {
        sandboxedKjs = new Kjs({
            fx: {
                animations: false
            }
        });
    });

    it('merges object', function () {
        expect(sandboxedKjs.options.fx.animations).toBe(false);
    });
});