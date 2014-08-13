'use strict';

/* Controllers */

angular.module('myApp.controllers', ['myApp.services'])
    .controller('UploadController', ['$scope', 'XLSXReaderService', '$location', function ($scope, XLSXReaderService, $location ) {
        $scope.preview = function () {
            $location.path('/preview');
        };

        $scope.showPreview = false;

        $scope.fileChanged = function (files) {
            $scope.sheets = [];
            $scope.excelFile = files[0];

            XLSXReaderService.readFile($scope.excelFile, $scope.showPreview).then(function (xlsxData) {
                $scope.sheets = xlsxData.sheets;
                console.log($scope.sheets);
                $location.path('/preview');
            });
//
        };
    }])
    .controller('PreviewController', ['$scope', 'XLSXReaderService', function ($scope, XLSXReaderService) {
        $scope.showPreview = false;

        $scope.showPreviewChanged = function () {
            if ($scope.showPreview) {
                XLSXReaderService.readFile($scope.excelFile, $scope.showPreview).then(function (xlsxData) {
                    $scope.sheets = xlsxData.sheets;
                });
            }
            ;
        };
    }]);


