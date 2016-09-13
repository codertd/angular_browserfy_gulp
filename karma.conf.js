module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '',
/*        logLevel: 'config.LOG_DEBUG',*/
		frameworks: ['jasmine'],
		files: [
            'dist/www/js/main.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'test/unit/**/*.js'
		],
		autoWatch: true,
		singleRun: false,
		browsers: ['PhantomJS']
	});
};
