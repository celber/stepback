var gulp = require('gulp');
var KarmaServer = require('karma').Server;
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var postcssCustomSelectors = require('postcss-custom-selectors');
var browserSync = require('browser-sync').create();
var Docma = require('docma');
var removeCode = require('gulp-remove-code');

var buildOrder = require('./buildOrder.js');

sass.compiler = require('node-sass');

// Compile sass into CSS & auto-inject into browsers
exports['serve:homepage:sass'] = function() {
  return gulp.src("./docs/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("./docs/css"))
      .pipe(browserSync.stream());
};


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



function concatJS () {
  return gulp
    .src(buildOrder)
    .pipe(sourcemaps.init())
    .pipe(concat('sb.js'))
    .pipe(removeCode({ debug: false }))
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

function buildDocs() {
  return Docma.create()
    .build({
      "src": ["./src/namespaces.js"].concat(buildOrder.concat([
        "./README.md"
      ])),
      "assets": {
        "./": ["./dist", "./playground"]
      },
      "dest": "./docs",
      "clean": true,
      "debug": false,
      "jsdoc": {
        "encoding": "utf8",
        "recurse": true,
        "pedantic": false,
        "access": null,
        "package": null,
        "module": false,
        "undocumented": false,
        "undescribed": false,
        "ignored": false,
        "hierarchy": true,
        "relativePath": null,
        "filter": null,
        "sort": "grouped",
        "allowUnknownTags": false,
        "plugins": []
      },
      "markdown": {
        "gfm": true,
        "tables": true,
        "breaks": false,
        "pedantic": false,
        "sanitize": false,
        "smartLists": true,
        "smartypants": false,
        "xhtml": false,
        "tasks": true,
        "emoji": true
      },
      "app": {
        "title": "Svarog Documentation",
        "meta": null,
        "entrance": "content:readme",
        "routing": "path"
      },
      "template": {
        "options": {
          "title": {
            "label": "Svarog v1.0.0"
          },
          "sidebar": {
            "itemsOverflow": "shrink",
            "itemsFolded": false,
            "badges": true
          },
          "symbols": {
            "meta": true,
            "params": "table",
            "props": "table"
          }
        }
      }
    })
    .catch(error => {
        console.log(error);
    });
}

exports.buildDocs = buildDocs;

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

const build = gulp.series(buildSCSS, buildJS, buildDocs);
exports.build = build;

exports.default = build;

exports.watch = gulp.series(build, function watchSrc() {
  browserSync.init({
    server: {
      baseDir: "./docs",
    },
    ghostMode: false,
    port: 3001
  });

  watch(buildOrder.concat(['./src/**/*.scss', './src/**/*.js']), function(cb) {
    build(cb);
  });

  watch('./dist/sb.js').on('change', browserSync.reload);
});