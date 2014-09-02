'use strict';


// Declare app level module which depends on filters, and services
angular.module('financeApplication', [
  'ngRoute',
  'financeApplication.filters',
  'financeApplication.services',
  'financeApplication.directives',
  'financeApplication.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/upload', {templateUrl: 'partials/upload.html', controller: 'UploadController'});
  $routeProvider.when('/preview', {templateUrl: 'partials/preview.html', controller: 'UploadController'});
  $routeProvider.when('/financials', {templateUrl: 'partials/financials.html', controller: 'FinancialsController'});
  $routeProvider.when('/dashboard', {templateUrl: 'partials/dashboard.html', controller: 'DashboardController'});
  $routeProvider.otherwise({redirectTo: '/upload'});

}]);
