'use strict';

/* Controllers */

angular.module('financeApplication.controllers', ['financeApplication.services'])
    .controller('UploadController', ['$scope', 'XLSXReaderService', '$location', function ($scope, XLSXReaderService, $location) {

        var validSheets = ['IS-ZA-Actuals', 'IS-UG-Actuals', 'Q2-ZA Plan', 'Q2-UG Plan'];

        $scope.upload = function (file) {
            XLSXReaderService.readFile(file[0]).then(function (sheets) {
                $scope.sheets = sheets;
            });
        };

        $scope.printSuccessMessage = function () {
            var missing = _.transform(validSheets, function (result, sheet) {
                var sheetMissing = _.find($scope.sheets, sheet) == undefined;
                if (sheetMissing) {
                    result.push(sheet);
                }
            });
            var successMessage = 'Successfully uploaded file';
            var failureMessage = 'The excel file uploaded does not contain ';
            return missing.length > 0 ? failureMessage + missing.toString().replace(/,/g, ', ') : successMessage;
        }
    }]);

