var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var concat = require('gulp-concat');
var minify = require('gulp-minify');

gulp.task('concat', function() {
  return gulp.src('./src/*.js')
    .pipe(concat('k.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('minify', function() {
    return gulp.src(['./dist/k.js'])
      .pipe(minify())
      .pipe(gulp.dest('dist'))
  });

gulp.task('build', gulp.series('concat', 'minify'));

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

//gulp.task('default', ['build']);