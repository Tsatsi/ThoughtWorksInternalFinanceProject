'use strict';

/* Controllers */

angular.module('financeApplication.controllers', ['financeApplication.services', 'financeApplication.directives'])
    .controller('UploadController', ['$scope', 'XLSXReaderService', '$location', function ($scope, XLSXReaderService, $location) {

        var validSheets = ['IS-ZA-Actuals', 'IS-UG-Actuals', 'Q2-ZA Plan', 'Q2-UG Plan'];

        var successMessage = 'Successfully uploaded file';
        var failureMessage = 'The excel file uploaded does not contain ';
        $scope.upload = function (file) {
            XLSXReaderService.readFile(file[0]).then(function () {
                if ($scope.uploadSuccessful()) {
                    $location.path('/dashboard');
                }
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
    }])
    .controller('FinancialsController', ['$scope', '$location', 'FinanceModel', function ($scope, $location, FinanceModel) {

        var data = function () {
            var data = _.find($scope.financials.data, $scope.indicator);

            var plannedValues = _.filter(data.values, function (value) {
                return value.type === 'Plan';
            });

            var actualValues = _.filter(data.values, function (value) {
                return value.type === 'Actual';
            });

            var months = _.transform(plannedValues, function (result, value) {
                result.push(value.period);
            });

            var planAmounts = _.transform(plannedValues, function (result, value) {
                result.push(value.amount);
            });

            var actualAmounts = _.transform(actualValues, function (result, value) {
                result.push(value.amount);
            });

            var result = {
                xData: months,
                yData: [
                    {name: 'Plan', data: planAmounts},
                    {name: 'Actual', data: actualAmounts}
                ]
            };

            return  result;


        };

        $scope.financials = FinanceModel.financials();

        $scope.backToDashboard = function () {
            $location.path('/dashboard');
        };

        $scope.chartVisible = false;


        var initializeChartData = function () {
            $scope.chartData = data();
            $scope.chartYData = $scope.chartData.yData;
            $scope.chartXData = $scope.chartData.xData;
        };

        $scope.showChart = function (indicator) {
            $scope.chartVisible = true;
            $scope.chartIndicator = indicator;
            initializeChartData();
        };

        $scope.$watch('financials', function () {
            $scope.chartType = $scope.financials.type === 'Accumulative Financials' ? 'line' : 'column';
        });

        $scope.hideChart = function () {
            $scope.chartVisible = false;
        };

        var initialiseBillRatesAndUtilisation = function() {
            $scope.averageBillRate = {};
            $scope.averageUtilisation = {};
        };

        initialiseBillRatesAndUtilisation();

        $scope.cancel = function () {
            initialiseBillRatesAndUtilisation();
        }

    }])
    .controller('DashboardController', ['$scope', 'FinanceModel', '$location', function ($scope, FinanceModel, $location) {

        $scope.financials = function (region, cumulative) {
            FinanceModel.financials(region, cumulative);
            $location.path('/financials');
        };

        $scope.opex = function (region) {
            FinanceModel.opex(region);
            $location.path('/financials');
        };

        $scope.backToUploadPage = function () {
            $location.path('/upload');
        };

    }]);

