'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
    .controller('UploadController', ['$scope', 'XLSXReaderService', '$location', function ($scope, XLSXReaderService, $location ) {

        $scope.upload = function (file) {
            XLSXReaderService.readFile(file[0]).then(function (sheets) {
                $scope.sheets = sheets;
            });
        };

        $scope.missingSheet = function (sheet) {
            return _.find($scope.sheets, sheet) == undefined;
        }
    }]);

