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
        scope.backToUploadPage();
        expect(location.path).toHaveBeenCalledWith('/upload');
    });

    describe('financials', function () {
        it('should know how to initialise the financials model', function () {
            spyOn(location, 'path');
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
        it('should know how to initialise the opex model');
        it('should redirect to the opex page when initialisation is complete');
    });




});