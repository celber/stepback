var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var serve = require('gulp-serve');
var watch = require('gulp-watch');

gulp.task('serve', serve('.'));


function _concat () {
  return gulp
    .src([
      './src/Core.js',
      './src/ComponentManager.js',
      './src/Component.js',
      './src/Container.js',
      './src/DOM/*.js',
      './src/layout/*.js'
    ])
    .pipe(concat('k.js'))
    .pipe(gulp.dest('./dist/'));
  }

gulp.task('concat', _concat);

function _minify() {
  return gulp.src(['./dist/k.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist'))
}

gulp.task('minify', _minify);

gulp.task('build', gulp.series('concat', 'minify'));

/**
 * Run test once and exit
 */

function _test(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
}
gulp.task('test', _test);

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function _test(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
});

//gulp.task('default', ['build']);