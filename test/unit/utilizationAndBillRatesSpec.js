'use strict';

describe('UtilizationController', function() {
    var controller, scope, financeModel, location;

    beforeEach(module('financeApplication.controllers', 'financeApplication.services'));
    beforeEach(inject(function ($rootScope, $controller, $location, FinanceService) {
        scope = $rootScope.$new();
        controller = $controller('UtilizationController', {$scope: scope});
        location = $location;
    }));

    //describe('initialization', function () {
//        it('should have all the months of the year defined', function () {
//            expect(scope.months).toEqual(moment.months())
//        });

        //it('should know how to format planned utilization figures', function () {
        //    var plannedUtilization = {};
//            spyOn();
//            expect(scope.plannedUtilization).toEqual(plannedUtilization);
//        });
//    });

    //describe('navigation', function () {
    //    it('should know how to go back to the dashboard page', function () {
    //        spyOn(location, 'path');
    //        scope.backToDashboard();
    //        expect(location.path).toHaveBeenCalledWith('/dashboard');
    //    });
    //});

});
