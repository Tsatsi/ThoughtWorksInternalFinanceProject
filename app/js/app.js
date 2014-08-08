'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/upload', {templateUrl: 'partials/upload.html', controller: 'UploadController'});
  $routeProvider.when('/preview', {templateUrl: 'partials/preview.html', controller: 'PreviewController'});
  $routeProvider.otherwise({redirectTo: '/upload'});

}]);
