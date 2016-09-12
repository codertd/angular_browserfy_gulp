require('jquery');
require('angular');

// additional angular modules
require('angular-ui-router');

http://mindthecode.com/writing-browserify-modules-for-your-angular-app/

var app = angular.module('app', ['ui.router']);
app.config(require('./routes/MainRoutes'));

var MainController = require('./controllers/MainController');
app.controller('MainController', ['$scope', MainController]);
