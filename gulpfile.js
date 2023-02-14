const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssSorter = require("css-declaration-sorter");
const mmq = require("gulp-merge-media-queries");

const browserSync = require("browser-sync");

const cleanCss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");

const htmlBeautify = require("gulp-html-beautify");
const { series } = require("gulp");

function compileSass() {
  return gulp.src("./src/assets/sass/**/*.scss")
  .pipe(sass())
  .pipe(postcss([autoprefixer(), cssSorter({
    order: "concentric-css"
  })]))
  .pipe(mmq())
  .pipe(gulp.dest("./public/assets/css"))
  .pipe(cleanCss())
  .pipe(rename({
    suffix:".min"
  }))
  .pipe(gulp.dest("./public/assets/css"))
}

function browserInit() {
  browserSync.init({
    server:{
      baseDir:"./public"
    }
  });
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function minJS() {
  return gulp.src("./src/assets/js/**/*.js")
  .pipe(uglify())
  .pipe(rename({
    suffix:".min"
  }))
  .pipe(gulp.dest("./public/assets/js"))
}

function formatHTML() {
  return gulp.src("./src/*.html")
  .pipe(htmlBeautify({
    indent_size: 2,
    indent_with_tabs: true,
  }))
  .pipe(gulp.dest("./public"))
}

function watch() {
  gulp.watch("./src/assets/sass/**/*.scss", gulp.series(compileSass, browserReload));
  gulp.watch("./src/*.html", gulp.series(formatHTML, browserReload));
  gulp.watch("./src/assets/js/**/*.js", gulp.series(minJS, browserReload));
}

exports.default = gulp.parallel(browserInit, watch);

