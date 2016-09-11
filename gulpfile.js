var gulp = require('gulp')
var connect = require('gulp-connect')
var sass = require('gulp-sass');




gulp.task('styles', function() {
    gulp.src('app/styles/**/*')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/www/css/'));
});

gulp.task('connect', function () {
	connect.server({
		root: 'app',
		port: 4000
	})
})


//Watch task
gulp.task('default',function() {
    gulp.watch('app/styles/**/*.scss',['styles']);
});
