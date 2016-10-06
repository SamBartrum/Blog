var gulp = require('gulp');
var sass = require('gulp-sass');

var sassinput = './public/static/scss/**/*.scss'
var cssoutput = './public/static/css/'


gulp.task('styles', function() {
    return gulp.src(sassinput)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(cssoutput));
});

gulp.task('default',function() {
    return gulp.watch(sassinput, ['styles']);
});