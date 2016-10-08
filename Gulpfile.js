var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var sassinput = './static-dev/sass/**/*.sass'
var cssoutput = './public/static/css/'
var jsinput = './static-dev/js/**/*.js'
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

//Uglifies js and preprocesses the sass on the fly
gulp.task('watchsass', function(){
    gulp.watch(sassinput, ['sass']);
});

gulp.task('watchjs', function(){
    gulp.watch(jsinput, ['uglify']);
});



gulp.task('default', ['uglify', 'sass', 'watchsass', 'watchjs'])