describe("Worker", function () {
  it("launches thread from file", function (done) {
    var worker = new Sb.Worker('/base/test/fixtures/worker.js');

    worker.on("message", function (msg) {
      expect(msg.data).toBe(3);
      done()
    });
    worker.post(2);
  });

  it("launches thread from inline function", function (done) {
    var worker = new Sb.Worker(function () {
      onmessage = function(e) {
        postMessage(e.data+5);
      }
    });

    worker.on("message", function (msg) {
      expect(msg.data).toBe(10);
      done()
    });
    worker.post(5);
  });

  it("terminates", function (done) {
    var worker = new Sb.Worker(function () {
      onmessage = function(e) {
        postMessage(e.data+5);
      }
    });

    var cb = {
      func: function () {
        worker.terminate();

        worker.post(5);
      }
    };

    spyOn(cb, 'func');

    worker.on("message", cb.func);
    worker.post(5);
    setTimeout(function () {
      expect(cb.func).toHaveBeenCalledTimes(1);
      done();
    }, 1400);
  });
});