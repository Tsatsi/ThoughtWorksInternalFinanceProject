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
            if (region === 'JHB'){
                $location.path('/financials');
            }
        };

        $scope.financials = {"region": "Johannesburg", "data": [
            {
                "indicator": "Net Revenue",
                "serialNumber": 1,
                "values": [
                    {
                        "period": "August 2014",
                        "value": {
                            "amount": 100,
                            "type": "Currency"
                        }
                    },
                    {
                        "period": "August 2014 Plan",
                        "value": {
                            "amount": 1000,
                            "type": "Currency"
                        }
                    }
                ]
            },
            {
                "indicator": "Gross Profit %",
                "serialNumber": 2,
                "values": [
                    {
                        "period": "August 2014",
                        "value": {
                            "amount": 5.5,
                            "type": "Percentage"
                        }
                    },
                    {
                        "period": "August 2014 Plan",
                        "value": {
                            "amount": 5.7,
                            "type": "Percentage"
                        }
                    }
                ]
            },
            {
                "indicator": "Cost of Service",
                "serialNumber": 3,
                "values": [
                    {
                        "period": "August 2014",
                        "value": {
                            "amount": 467890,
                            "type": "Currency"
                        }
                    },
                    {
                        "period": "August 2014 Plan",
                        "value": {
                            "amount": 567489,
                            "type": "Currency"
                        }
                    }
                ]
            },
            {
                "indicator": "Total Operating Expense",
                "serialNumber": 4,
                "values": [
                    {
                        "period": "August 2014",
                        "value": {
                            "amount": 898493,
                            "type": "Currency"
                        }
                    },
                    {
                        "period": "August 2014 Plan",
                        "value": {
                            "amount": 673829,
                            "type": "Currency"
                        }
                    }
                ]
            },
            {
                "indicator": "Operating Contribution",
                "serialNumber": 5,
                "values": [
                    {
                        "period": "August 2014",
                        "value": {
                            "amount": 442800,
                            "type": "Currency"
                        }
                    },
                    {
                        "period": "August 2014 Plan",
                        "value": {
                            "amount": 454210,
                            "type": "Currency"
                        }
                    }
                ]
            },
            {
                "indicator": "Client Gross Margin %",
                "serialNumber": 6,
                "values": [
                    {
                        "period": "August 2014",
                        "value": {
                            "amount": 8.2,
                            "type": "Percentage"
                        }
                    },
                    {
                        "period": "August 2014 Plan",
                        "value": {
                            "amount": 9.3,
                            "type": "Percentage"
                        }
                    }
                ]
            }
        ]};

    }]);

