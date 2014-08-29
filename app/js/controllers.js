'use strict';

/* Controllers */

angular.module('financeApplication.controllers', ['financeApplication.services'])
    .controller('UploadController', ['$scope', 'XLSXReaderService', '$location', function ($scope, XLSXReaderService, $location) {

        var validSheets = ['IS-ZA-Actuals', 'IS-UG-Actuals', 'Q2-ZA Plan', 'Q2-UG Plan'];

        var successMessage = 'Successfully uploaded file';
        var failureMessage = 'The excel file uploaded does not contain ';
        $scope.upload = function (file) {
            XLSXReaderService.readFile(file[0]).then(function () {
                $scope.uploadComplete = true;
            });
        };

        $scope.uploadConfirmationMessage = function () {
            var missing = _.transform(validSheets, function (result, sheet) {
                var sheetMissing = !XLSXReaderService.sheets() || XLSXReaderService.sheets()[sheet] == undefined;

                if (sheetMissing) {
                    result.push(sheet);
                }
            });

            return missing.length > 0 ? failureMessage + missing.toString().replace(/,/g, ', ') : successMessage;
        };

        $scope.uploadSuccessful = function () {
            return $scope.uploadConfirmationMessage() === successMessage;
        };

        $scope.messageStyle = function () {
            return $scope.uploadSuccessful() ? 'alert alert-success' : 'alert alert-danger alert-error';
        };

        $scope.backToUploadPage = function () {
            $location.path('/upload');
        };

        $scope.financialsFor = function (region, cumulative){
            return XLSXReaderService.financials(region, cumulative);
        };

        $scope.go = function () {
            $location.path('/financials');
        };

        $scope.header = function () {

        };

    }]);

