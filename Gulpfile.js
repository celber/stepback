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
var browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

// Compile sass into CSS & auto-inject into browsers
exports['serve:homepage:sass'] = function() {
  return gulp.src("./homepage/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("./homepage/css"))
      .pipe(browserSync.stream());
};


// gulp.task('serve:playground', serve({root: ['./playground', './dist']}));
// gulp.task('serve:docs', serve({root: ['./docs']}));
exports['serve:homepage'] = function() {

  exports['serve:homepage:sass']();

  browserSync.init({
      server: "./homepage"
  });

  gulp.watch("./homepage/scss/*.scss", exports['serve:homepage:sass']);
  gulp.watch("./homepage/*.html").on('change', browserSync.reload);
};


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


function concatJS () {
  return gulp
    .src(fileList)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat('sb.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/'));
}


function buildSCSS () {
  return gulp.src('./src/**/*.scss')
  .pipe(postcss({modules: true}))
  .pipe(
    postcss([
      postcssCustomSelectors({})
    ])
  )
  .pipe(sourcemaps.init())
  .pipe(sass.sync().on('error', sass.logError))
  .pipe(concat('sb.css'))
  .pipe(gulp.dest('./dist'))
  .pipe(sourcemaps.write());
};


function minifyJS() {
  return gulp.src(['./dist/sb.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist'))
}

function buildJS() {
  return gulp.series(concatJS, minifyJS)
}

exports.buildJS = buildJS;

/**
 * Run test once and exit
 */

function test(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
}

exports.test = test;

/**
 * Watch for file changes and re-run tests on each change
 */
function tdd(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done).start();
};
exports.tdd = tdd;

exports.build = gulp.series(buildSCSS, buildJS);

exports.default = gulp.series(buildSCSS, buildJS);

exports.watch = function watch(done) {
  watch(fileList.concat(['./src/**/*.scss']), function(cb) {
    console.log("Changes detected!");
    gulp.series(buildSCSS, buildJS)(cb);
    //cb();
  });
};