var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var sassinput = './public/static/scss/**/*.scss'
var cssoutput = './public/static/css/'
var jsinput = './public/static/js/**/*.js'
var jsoutput = './public/static/js'


//Not working yet...
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'Blog'
    },
  })
})

//Preprocess all the sass into css
gulp.task('sass', function() {
    return gulp.src(sassinput)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssoutput))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// Concatenate the js into a single file and uglify it
gulp.task('uglify', function () {
    return gulp.src(jsinput)
        .pipe(concat('blog.js'))
        .pipe(gulp.dest(jsoutput))
        .pipe(rename('blog.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsoutput))
});

gulp.task('default', ['browserSync', 'sass'], function() {
    return gulp.watch(sassinput, ['sass']);
});