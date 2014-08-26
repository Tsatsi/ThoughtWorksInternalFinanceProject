'use strict';

/* Directives */


var app = angular.module('financeApplication.directives', []);


app.directive('appVersion', ['version', function (version) {
    return function (scope, elm, attrs) {
        elm.text(version);
    };
}]);

app.directive('financialInput', function () {
    return {
        restrict: 'E',
        scope: {
            header: '@'
        },
        templateUrl: 'partials/financialsInput.html',
        transclude: true
    };
});



