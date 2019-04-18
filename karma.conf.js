module.exports = function(config) {
    config.set({
      browsers: ['PhantomJS'],
      reporters: ['progress', 'coverage'],
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
        'src/DOM/**/*.js',
        'src/ComponentManager.js',
        'src/Component.js',
        'src/Container.js',
        'test/**/*.spec.js'
      ]
    });
  };