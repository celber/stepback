var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var sourcemaps = require('gulp-sourcemaps');
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
  return gulp.src("./docs/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("./docs/css"))
      .pipe(browserSync.stream());
};


exports['serve:playground'] = serve({root: ['./docs/playground', './dist']});
exports['serve:docs'] = function () {
  browserSync.init({
    server: "./docs/"
  });

  gulp.watch("./docs/**/*.html").on('change', browserSync.reload);
}

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
  './src/mixins/**/*.js',
  './src/layout/Fit/*.js',
  './src/layout/VSplit/VSplit.js',
  './src/zendesk/Button/Button.js',
  './src/zendesk/Arrow/Arrow.js',
  './src/zendesk/menu/Item/Item.js',
  './src/zendesk/Avatar/Avatar.js'
];


function concatJS () {
  return gulp
    .src(fileList)
    .pipe(sourcemaps.init())
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
  .pipe(sourcemaps.write())
  .pipe(browserSync.stream());
};


function minifyJS() {
  return gulp.src(['./dist/sb.js'])
    .pipe(minify())
    .pipe(gulp.dest('dist'))
}

const buildJS = gulp.series(concatJS, minifyJS);

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

const build = gulp.series(buildSCSS, buildJS);
exports.build = build;

exports.default = build;

exports.watch = gulp.series(build, function watchSrc() {
  browserSync.init({
    server: {
      baseDir: "./test",
    },
    ghostMode: false,
    serveStatic: [{
      route: '/dist',
      dir: './dist'
    }],
    port: 3001
  });

  watch(fileList.concat(['./src/**/*.scss']), function(cb) {
    build(cb);
  });

  watch('./dist/sb.js').on('change', browserSync.reload);
});