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
            scope.showChart('');
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
            scope.financials.type = 'Accumulative Financials';
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


});

