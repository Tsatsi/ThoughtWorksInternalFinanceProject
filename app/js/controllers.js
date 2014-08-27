'use strict';

/* Controllers */

angular.module('financeApplication.controllers', ['financeApplication.services'])
    .controller('UploadController', ['$scope', 'XLSXReaderService', '$location', function ($scope, XLSXReaderService, $location) {

        var validSheets = ['IS-ZA-Actuals', 'IS-UG-Actuals', 'Q2-ZA Plan', 'Q2-UG Plan'];
        var successMessage = 'Successfully uploaded file';
        var failureMessage = 'The excel file uploaded does not contain ';
        $scope.upload = function (file) {
            XLSXReaderService.readFile(file[0]).then(function (sheets) {
                $scope.sheets = sheets;
                $scope.uploadComplete = true;
//                $location.path("preview");
            });
        };


        $scope.uploadConfirmationMessage = function () {
            var missing = _.transform(validSheets, function (result, sheet) {
                var sheetMissing = _.find($scope.sheets, sheet) == undefined;
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

        $scope.region = function () {
            return $scope.financials.region;
        };

        $scope.backToUploadPage = function () {
            $location.path('/upload');
        };

        $scope.financeNavigation = function (region) {
            if (region === 'JHB') {
                $location.path('/financials');
            }
        };

        $scope.financials = {"region": "Johannesburg", "data": [
            {
                "indicator": "Net Revenue",
                "serialNumber": 1,
                "type": "Currency",
                "values": [
                    {"period": "August", "amount": 100, "type": "Plan"},
                    {"period": "August", "amount": 100, "type": "Actual"}
                ]
            },
            {
                "indicator": "Gross Profit",
                "serialNumber": 2,
                "type": "Percentage",
                "values": [
                    {"period": "August", "amount": 5, "type": "Plan"},
                    {"period": "August", "amount": 6, "type": "Actual"}

                ]
            },
            {
                "indicator": "Cost of Services",
                "serialNumber": 3,
                "type": "Percentage",
                "values": [
                    {"period": "August", "amount": 5, "type": "Plan"},
                    {"period": "August", "amount": 6, "type": "Actual"}

                ]
            },
            {
                "indicator": "Some other stuffs",
                "serialNumber": 4,
                "type": "Percentage",
                "values": [
                    {"period": "August", "amount": 5, "type": "Plan"},
                    {"period": "August", "amount": 6, "type": "Actual"}

                ]
            },
            {
                "indicator": "Some other other stuff",
                "serialNumber": 5,
                "type": "Percentage",
                "values": [
                    {"period": "August", "amount": 5, "type": "Plan"},
                    {"period": "August", "amount": 6, "type": "Actual"}

                ]
            },
            {
                "indicator": "The last stuffs",
                "serialNumber": 6,
                "type": "Percentage",
                "values": [
                    {"period": "August", "amount": 5, "type": "Plan"},
                    {"period": "August", "amount": 6, "type": "Actual"}

                ]
            }

        ]};

    }]);

