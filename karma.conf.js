module.exports = function(config) {
    config.set({
      browsers: ['PhantomJS'],
      reporters: ['dots', 'coverage'],
      preprocessors: {
        'src/**/*.js': ['coverage']
      },
      coverageReporter: {
        reporters: [
            { type: 'lcov', subdir: '.'},
        ]
      },
      frameworks: ['jasmine'],
      files: [
        'src/Core.js',
        'test/**/*.spec.js'
      ]
    });
  };