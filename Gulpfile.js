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
exports['homepage:sass'] = function() {
  return gulp.src("./homepage/scss/*.scss")
      .pipe(sass())
      .pipe(gulp.dest("./homepage/css"))
      .pipe(browserSync.stream());
};


exports['serve:homepage'] = function () {
  browserSync.init({
    server: {
      baseDir: "./homepage/",
      routes: {
        "/stepback/": "./homepage/"
      }

    }
  });

  gulp.watch("./homepage/docs/**/*.html").on('change', browserSync.reload);
}


function concatJS () {
  return gulp
    .src(buildOrder)
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
    .pipe(removeCode({ debug: false }))
    .pipe(minify({
      noSource: true
    }))
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
      "dest": "./homepage/docs",
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
        "title": "StepBack Documentation",
        "meta": null,
        "entrance": "content:readme",
        "routing": "path",
        "base": "/stepback/docs/"
      },
      "template": {
        "options": {
          "title": {
            "label": "StepBack v1.0.0"
          },
          "contentView": {
            "bookmarks": "h1,h2,h3",
            "faLibs": "all"
          },
          "navbar": {
            "enabled": true,
            "fixed": true,
            "dark": false,
            "animations": true,
            "menu": [
              {
                "iconClass": "fas fa-book",
                "label": "API Reference",
                "href": "./api/"
              },
              {
                "iconClass": "fas fa-play",
                "label": "Playground",
                "href": "./playground/index.html",
                "target": "_self"
              }
            ]
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

exports["build:docs"] = buildDocs;

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
  const server = new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: false
  }, done);

  server.start();

  server.on('run_complete', function (browsers, result) {
    if (!result.error) {
      console.log('Tests did not fail, building new package.')
      build();
    }
  });
};
exports.tdd = tdd;

const build = gulp.series(buildSCSS, buildJS);
exports.build = build;

exports.default = build;

exports.watch = gulp.series(build, function watchSrc() {
  browserSync.init({
    server: {
      baseDir: "./homepage",
    },
    ghostMode: false,
    port: 3001
  });

  watch(buildOrder.concat(['./src/**/*.scss', './src/**/*.js']), function(cb) {
    build(cb);
  });

  watch('./dist/sb.js').on('change', browserSync.reload);
});