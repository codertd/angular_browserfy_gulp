var gulp = require('gulp')
var connect = require('gulp-connect')
var sass = require('gulp-sass');

// requires browserify and vinyl-source-stream
var browserify = require('browserify')
var source = require('vinyl-source-stream')


gulp.task('styles', function() {
    gulp.src('app/styles/**/*')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/www/css/'));
});


gulp.task('browserify', function() {
	// Grabs the app.js file
    return browserify('./app/scripts/**/*.js')
    	// bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        // saves it the dist/www/js/ directory
        .pipe(gulp.dest('./dist/www/js/'));
})


gulp.task('connect', function () {
	connect.server({
		root: 'app',
		port: 4000
	})
})


//Watch task
gulp.task('default',function() {
    gulp.watch('app/styles/**/*.scss',['styles']);

    gulp.watch('app/scripts/**/*.js',['browserify']);
});
