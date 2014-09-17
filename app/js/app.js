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
  $routeProvider.when('/upload', {templateUrl: 'views/partials/upload.html', controller: 'UploadController'});
  $routeProvider.when('/preview', {templateUrl: 'views/partials/preview.html', controller: 'UploadController'});
  $routeProvider.when('/financials', {templateUrl: 'views/partials/financials.html', controller: 'FinancialsController'});
  $routeProvider.when('/dashboard', {templateUrl: 'views/partials/dashboard.html', controller: 'DashboardController'});
  $routeProvider.otherwise({redirectTo: '/upload'});

}]);
