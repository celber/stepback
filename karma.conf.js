process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
    config.set({
      browsers: ['FirefoxHeadless', 'ChromeHeadless'],
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
      files: [
        'src/Core.js',
        'src/DOM/**/*.js',
        'src/ComponentManager.js',
        'src/Component.js',
        'src/Container.js',
        'src/layout/*.js',
        'test/**/*.spec.js'
      ]
    });
  };