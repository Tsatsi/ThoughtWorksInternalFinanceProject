'use strict';

/* Controllers */

angular.module('financeApplication.controllers', ['financeApplication.services'])
    .controller('UploadController', ['$scope', 'XLSXReaderService', '$location', function ($scope, XLSXReaderService, $location ) {
        $scope.message = '';

        $scope.upload = function (file) {
            XLSXReaderService.readFile(file[0]).then(function (sheets) {
                $scope.sheets = sheets;
            });
        };

        $scope.missingSheet = function (sheet) {
            return _.find($scope.sheets, sheet) == undefined;
        };

        $scope.printSuccessMessage = function(allSheets) {
            var missing = [];

            _.forEach(allSheets, function(sheet) {
                if ($scope.missingSheet(sheet)){
                    missing.push(Object.keys(sheet)[0])
                }
            });

            if (!missing.length == 0){
                $scope.message = 'The excel file uploaded does not contain ' + missing
            }
            else {
                $scope.message = 'Successfully uploaded file';
            }

            return $scope.message;
        }
    }]);

