process.env.CHROME_BIN = require('puppeteer').executablePath();

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
      files: [
        'src/Core.js',
        'src/DOM/**/*.js',
        'src/mixins/**/*.js',
        'src/ComponentManager.js',
        'src/Component.js',
        'src/Container.js',
        'src/zendesk/Button/Button.js',
        'src/layout/Fit/*.js',
        'src/layout/VSplit/*.js',
        'test/**/*.spec.js'
      ]
    });
  };