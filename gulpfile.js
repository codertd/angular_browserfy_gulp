var gulp    = require('gulp')
var connect = require('gulp-connect')
var sass    = require('gulp-sass')
var gutil   = require('gulp-util')
var del     = require('del');

var concat  = require('gulp-concat')
var source  = require('vinyl-source-stream');
var buffer  = require('vinyl-buffer');

// requires browserify and vinyl-source-stream
var browserify = require('browserify')
var source     = require('vinyl-source-stream')

var jshint = require('gulp-jshint')
var uglify = require('gulp-uglify')




gulp.task('styles', function() {
    gulp.src('app/styles/**/*')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/www/css/'));
});

// Views task
gulp.task('views', function() {
  // Get our index.html
  gulp.src('app/index.html')
  // And put it in the dist folder
  .pipe(gulp.dest('dist/www/'));

  // Any other view files from app/views
  gulp.src('./app/views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('dist/www/views/'));
});


// JSHint task
gulp.task('lint', function() {
  gulp.src('./app/scripts/**/*.js')
  .pipe(jshint())
  // You can look into pretty reporters as well, but that's another story
  .pipe(jshint.reporter('default'));
});


gulp.task('browserify', function() {
	// Grabs the app.js file
    return browserify('./app/scripts/main.js')
    	// bundles it and creates a file called main.js
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer()) // <----- convert from streaming to buffered vinyl file object
        .pipe(uglify()) // now gulp-uglify works
        // saves it the dist/www/js/ directory, already concat'd
        .pipe(gulp.dest('./dist/www/js/'));
})



gulp.task('build', function () {
  ['views', 'styles', 'browserify']
});


gulp.task('clean:dist', function () {
  return del([
    'dist/**/*',
  ]);
});



gulp.task('watch',function() {
    gulp.watch(['app/index.html', 'app/views/**/*.html'], ['views']);
    gulp.watch('app/styles/**/*.scss',['styles']);
    gulp.watch('app/scripts/**/*.js', ['browserify','lint']);
});


gulp.task('connect', function () {
	connect.server({
		root: 'dist/www',
		port: 4000
	})
})


// what to do by default.
gulp.task('default', ['connect', 'watch'])
