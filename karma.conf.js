process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function(config) {
    config.set({
      browsers: ['FirefoxHeadless', 'ChromeHeadless'],
      reporters: ['progress', 'coverage'],
      preprocessors: {
        'src/**/*.js': ['coverage', 'babel'],
        'test/**/*.js': ['babel']
      },
      babelPreprocessor: {
        options: {
          presets: ['@babel/preset-env'],
          sourceMap: 'inline'
        },
        filename: function (file) {
          return file.originalPath.replace(/\.js$/, '.es5.js');
        },
        sourceFileName: function (file) {
          return file.originalPath;
        }
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
        'src/Button/Button.js',
        'src/layout/fit/*.js',
        'src/layout/VSplit/*.js',
        'test/**/*.spec.js'
      ]
    });
  };