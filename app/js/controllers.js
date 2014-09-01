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

    }])
    .controller('GraphController',['$scope', function(){

        var data = XLSXReaderService.financials(region, cumulative);

        {
            var data = {"xData": ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],"yData":[{
                "name": "Tokyo",
                "data": [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            }, {
                "name": "New York",
                "data": [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
            }, {
                "name": "Berlin",
                "data": [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
            }, {
                "name": "London",
                "data": [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
            }]}

            $scope.lineChartYData=data.yData
            $scope.lineChartXData=data.xData
        }
    }]);

