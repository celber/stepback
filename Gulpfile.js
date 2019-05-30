var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var serve = require('gulp-serve');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var postcssCustomSelectors = require('postcss-custom-selectors');


sass.compiler = require('node-sass');

gulp.task('serve', serve('.'));

var fileList = [
  './src/Core.js',
  './src/ComponentManager.js',
  './src/Component.js',
  './src/Container.js',
  './src/DOM/*.js',
  './src/layout/Fit/*.js',
  './src/layout/VSplit/Vsplit.js',
  './src/zendesk/button/Button.js'
];


function _concatJS () {
  return gulp
    .src(fileList)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('k.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
}

gulp.task('concatJS', _concatJS);


function _buildSCSS () {
  return gulp.src('./src/**/*.scss')
  .pipe(postcss({modules: true}))
  .pipe(
    postcss([
      postcssCustomSelectors({})
    ])
  )
  .pipe(sourcemaps.init())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(concat('k.css'))
  .pipe(gulp.dest('./dist'))
  .pipe(sourcemaps.write());
};

gulp.task('buildSCSS', _buildSCSS);

function _minifyJS() {
  return gulp.src(['./dist/k.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist'))
}

gulp.task('minifyJS', _minifyJS);

gulp.task('buildJS', gulp.series('concatJS', 'minifyJS'));


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


gulp.task('build', gulp.series('buildSCSS','buildJS'));

gulp.task('default', gulp.series('buildSCSS','buildJS'));

gulp.task('watch', function (done) {
  watch(fileList, function(cb) {
    console.log("Changes detected!");
    gulp.series('buildSCSS','buildJS')(cb);
    //cb();
  });
});