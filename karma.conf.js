module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '',
/*        logLevel: 'config.LOG_DEBUG',*/
		frameworks: ['browserify','jasmine'],
		plugins: [
		      'karma-browserify',
		      'karma-jasmine',
					'karma-phantomjs-launcher'
		],
		preprocessors: {
      'test/unit/**/*.js': [/*'coverage',*/ 'browserify']
    },
		files: [
            'dist/www/js/main.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'test/unit/**/*.js'
		],
		autoWatch: true,
		singleRun: false,
		browsers: ['PhantomJS'],
		browserify: {
		      debug: true // output source maps
		      //transform: ['browserify-istanbul']
		}
	});
};
