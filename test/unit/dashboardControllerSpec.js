'use strict';

describe('DashboardController', function () {
    var controller, scope, financeModel, location;

    beforeEach(module('financeApplication.controllers', 'financeApplication.services'));
    beforeEach(inject(function ($rootScope, $controller, FinanceModel, $q, $location) {
        scope = $rootScope.$new();
        controller = $controller('DashboardController', {$scope: scope});
        financeModel = FinanceModel;
        location = $location;
    }));

    it('should know how to go back to the upload page', function () {
        spyOn(location, 'path');
        scope.backToDashboard();
        expect(location.path).toHaveBeenCalledWith('/upload');
    });

    describe('financials', function () {
        it('should know how to initialise financials', function () {
            spyOn(financeModel, 'financials');
            scope.financials('region','cumulative');
            expect(financeModel.financials).toHaveBeenCalled();
        });

        it('should redirect to the financials page when initialization is complete', function () {
            spyOn(location, 'path');
            spyOn(financeModel, 'financials');
            scope.financials('region','cumulative');
            expect(location.path).toHaveBeenCalledWith('/financials');
        });
    });

    describe('operating expenses', function () {
        it('should know how to initialise operating expenses', function () {
            spyOn(financeModel, 'opex');
            scope.opex('region');
            expect(financeModel.opex).toHaveBeenCalled();
        });

        it('should redirect to the opex page when initialisation is complete', function() {
            spyOn(location, 'path');
            spyOn(financeModel, 'opex');
            scope.opex('region');
            expect(location.path).toHaveBeenCalledWith('/financials');
        });
    });




});