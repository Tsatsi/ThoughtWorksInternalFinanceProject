'use strict';

describe('FinancialsController', function () {
    var scope, controller, financeModel, location;

    beforeEach(module('financeApplication.controllers', 'financeApplication.services'));
    beforeEach(inject(function ($rootScope, $controller, FinanceModel, $location) {
        scope = $rootScope.$new();
        financeModel = FinanceModel;
        controller = $controller;
        location = $location;

    }));

    describe('initial state', function () {
        beforeEach(function () {
            spyOn(financeModel, 'financials').andReturn({});
            controller = controller('FinancialsController', {$scope: scope});
        });

        it('should have financials controller defined', function () {
            expect(controller).toBeDefined();
        });

        it('should get the financials data from the financials model when controller is initialized', function () {
            expect(financeModel.financials).toHaveBeenCalled();
            expect(scope.financials).toBeDefined();
        });

        describe('charts', function () {
            it('should set chart visibility to false by default', function () {
                expect(scope.chartVisible).toBeFalsy();
            });
        });
    });

    describe('navigation', function () {
        it('should be able to navigate back to the dashboard', function () {
            spyOn(location, 'path');
            spyOn(financeModel, 'financials').andReturn({});
            controller = controller('FinancialsController', {$scope: scope});
            scope.backToDashboard();
            expect(location.path).toHaveBeenCalledWith('/dashboard');
        });
    });

    describe('chart', function () {
        var expectedChartData = {
            xData: ['January', 'February', 'March'],
            yData: [
                {name: 'Plan', data: [1, 2, 3]},
                {name: 'Actual', data: [2, 4, 6]}
            ]
        };
        var expectedFinancials = {
            region: 'Johannesburg',
            type: 'Accumulative Financials',
            data: [
                {
                    "indicator": 'Net Revenue',
                    "serialNumber": 1,
                    "type": "Currency",
                    "values": [
                        {"period": 'January', "amount": 1, "type": "Plan"},
                        {"period": 'January', "amount": 2, "type": "Actual"},
                        {"period": 'February', "amount": 2, "type": "Plan"},
                        {"period": 'February', "amount": 4, "type": "Actual"},
                        {"period": 'March', "amount": 3, "type": "Plan"},
                        {"period": 'March', "amount": 6, "type": "Actual"}
                    ],
                    "ytd": {
                        period: 'March',
                        amounts: {
                            plan: 6,
                            actual: 12
                        }
                    }
                }
            ]
        };

        beforeEach(function () {
            spyOn(financeModel, 'financials').andReturn(expectedFinancials);
            controller = controller('FinancialsController', {$scope: scope});
        });

        it('should know how to show the chart', function () {
            scope.showChart('Net Revenue');
            expect(scope.chartVisible).toBeTruthy();
        });

        it('should know the financial indicator that needs to be charted', function () {
            scope.showChart('Net Revenue');
            expect(scope.chartIndicator).toBe('Net Revenue');
        });

        it('should know how to hide the chart', function () {
            scope.hideChart();
            expect(scope.chartVisible).toBeFalsy();
        });

        it('should know how to initialize chart data', function () {
            scope.showChart('Net Revenue');
            expect(scope.chartData).toEqual(expectedChartData);
        });

        it('should show line charts for accumulative financials', function () {
            scope.financials.type = 'YTD Financials';
            scope.$digest();
            expect(scope.chartType).toBe('line');
        });

        it('should show column charts for financials', function () {
            scope.financials.type = 'Financials';
            scope.$digest();
            expect(scope.chartType).toBe('column');
        });

        it('should know the data that needs to be plotted on the x-axis', function () {
            scope.showChart('Net Revenue');
            expect(scope.chartXData).toEqual(expectedChartData.xData);
        });

        it('should know the data that needs to be plotted on the y-axis', function () {
            scope.showChart('Net Revenue');
            expect(scope.chartYData).toEqual(expectedChartData.yData);
        });
    });

    describe('bill rates and utilization', function () {
        beforeEach(function () {
            spyOn(financeModel, 'financials').andReturn({xxx:1});
            controller = controller('FinancialsController', {$scope: scope});
        });

        it('should know when bill rate and utilization values are not set for the individual regions when selecting Pan Africa', function () {
            expect(scope.allIndicatorsAreSet()).toBeFalsy();
        });


        it('should know when bill rate and utilization values are set for the individual regions when selecting Pan Africa', function() {
            spyOn(financeModel, 'indicatorsCaptured').andReturn(true);
            scope.financials.region = 'Pan Africa';
            expect(scope.allIndicatorsAreSet()).toBeTruthy();
        });

        it('should know how to clear values', function () {
            spyOn(financeModel, 'clearIndicators');
            scope.averageUtilisation = {something:1};
            scope.averageBillRate = {something:1};
            scope.billRate = {values: {something:1}};
            scope.utilization = {values: {something:1}};

            scope.cancel();
            expect(financeModel.clearIndicators).toHaveBeenCalled();
            expect(scope.averageUtilisation).toEqual({});
            expect(scope.averageBillRate).toEqual({});
            expect(scope.billRate).toEqual({values: {}});
            expect(scope.utilization).toEqual({values: {}});
        });

        it('should know how to save values', function () {
            spyOn(financeModel, 'addIndicator');
            spyOn(financeModel, 'indicator').andReturn({});
            scope.saveChanges();
            expect(financeModel.addIndicator).toHaveBeenCalled();
            expect(financeModel.indicator).toHaveBeenCalled();
            expect(scope.utilization).toBeDefined();
            expect(scope.billRate).toBeDefined();
        });

        describe("allowing manual addition of bill rates and utilization", function () {

            it("should not allow manual addition of bill rates and utilization when Pan Africa is selected", function () {
                scope.financials.region = "Pan Africa";
                expect(scope.allowBillRatesAndUtilizationEdits()).toBeFalsy();
            });

            it("should allow manual addition of bill rates and utilization when Pan Africa is not selected region", function () {
                scope.financials = {region: "Johannesburg", type: "Financials"};
                expect(scope.allowBillRatesAndUtilizationEdits()).toBeTruthy();
            });

            it("should only allow manual addition of bill rates and utilization when viewing financials", function () {
                scope.financials = {region: "Johannesburg", type: "Financials"};
                expect(scope.showUtilizationAndBillRate()).toBeFalsy();
            });

        });

        describe('displaying utilization and bill rates in financials table', function () {
            it('should not show when all values have not been captured', function () {
                scope.financials = {region: "Johannesburg", type: "Financials"};
                expect(scope.showUtilizationAndBillRate()).toBeFalsy();
            });

            it('should show when all values have been captured', function () {
                scope.financials = {region: "Johannesburg", type: "Financials"};
                scope.utilization = {values:{plan: 1, actual: 2}};
                scope.billRate = {values:{plan: 1, actual: 2}};
                expect(scope.showUtilizationAndBillRate()).toBeTruthy();
            });
        });

    });
});

