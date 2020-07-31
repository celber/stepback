process.env.CHROME_BIN = require('puppeteer').executablePath();

var buildOrder = require('./buildOrder.js');

module.exports = function(config) {
    config.set({
      browsers: ['FirefoxHeadless'],
      reporters: ['progress', 'coverage'],
      preprocessors: {
        'src/**/*.js': ['coverage']
      },
      coverageReporter: {
        reporters: [
            { type: 'lcov', subdir: '.'},
        ]
      },
      customLaunchers: {
        FirefoxHeadless: {
          base: 'Firefox',
          flags: [ '-headless' ],
        },
      },
      frameworks: ['jasmine'],
      files: [{included: false, served: true, watched: true, pattern: 'test/fixtures/**/*'}]
        .concat(buildOrder).concat(['test/**/*.spec.js'])
    });
  };