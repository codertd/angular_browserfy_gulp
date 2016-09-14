var gulp       = require('gulp')
var connect    = require('gulp-connect')
var gutil      = require('gulp-util')
var del        = require('del');
var concat     = require('gulp-concat')

var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');

// requires browserify and vinyl-source-stream
var browserify = require('browserify')
var source     = require('vinyl-source-stream')

var jshint     = require('gulp-jshint')
var uglify     = require('gulp-uglify')
var sass       = require('gulp-sass')

var Server     = require('karma').Server;

gulp.task('styles', function() {
    gulp.src('app/styles/**/*')
        .pipe(sass().on('error', sass.logError))
        // Optionally add autoprefixer
        //.pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
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


gulp.task('test', ['browserify'], function(done) {

    return new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
    }, done).start();

    // https://github.com/katowulf/browserify-gulp-boilerplate-simple
    // https://syropia.net/journal/javascript-testing-with-jasmine-and-gulp-redux

});


//******
// Tasks
//
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
});


gulp.task('clean:dist', function () {
  return del([
    'dist/**/*',
  ]);
});

gulp.task('build', ['views', 'styles', 'browserify']);

// what to do by default.
gulp.task('default', ['connect', 'watch'])
