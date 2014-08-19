'use strict';


describe('UploadController', function () {

    var controller, scope, readerService, q;

    beforeEach(module('financeApplication.controllers', 'financeApplication.services'));
    beforeEach(inject(function ($rootScope, $controller, XLSXReaderService, $q) {
        scope = $rootScope.$new();
        controller = $controller('UploadController', {$scope: scope});
        readerService = XLSXReaderService;
        q = $q;

    }));

    it("should have UploadController defined", function () {
        expect(controller).toBeDefined();
    });

    describe("#upload", function () {

        it("should be defined", function () {
            expect(scope.upload).toBeDefined();
        });

        it('should be called with a file', function () {
            spyOn(scope, 'upload');
            scope.upload('filename');
            expect(scope.upload).toHaveBeenCalledWith('filename');
        });

        describe("reading the file", function () {
            var expectedSheets = ['sheet 1', 'sheet 2'];

            beforeEach(function () {
                var deferred = q.defer();
                deferred.resolve(expectedSheets);
                spyOn(readerService, 'readFile').andReturn(deferred.promise);
                scope.upload('filename');
                scope.$digest();
            });

            it('should read the contents of the file', function () {
                expect(readerService.readFile).toHaveBeenCalled();
            });
            it('should know all the sheets in the uploaded file', function () {
                expect(scope.sheets).toBe(expectedSheets);
            });

        });

        describe("#validate", function () {
             beforeEach(function() {
                 var expectedSheets = [
                     {'IS-ZA-Actuals': {}},
                     {'Q2-UG-Plan': {}}
                 ];
                 var deferred = q.defer();
                 deferred.resolve(expectedSheets);
                 spyOn(readerService, 'readFile').andReturn(deferred.promise);
                 scope.upload('filename');
                 scope.$digest();
             });


            it("should be defined", function () {
                 expect(scope.missingSheet).toBeDefined();
            });

            it('should know when the IS-UG-Actuals sheet is missing', function () {
                expect(scope.missingSheet('IS-UG-Actuals')).toBeTruthy()
            });

            it('should know when the IS-ZA-Actuals sheet is not missing', function () {
                expect(scope.missingSheet('IS-ZA-Actuals')).toBeFalsy()
            });

            it('should know when the Q2-ZA-Plan sheet is missing', function () {
                expect(scope.missingSheet('Q2-ZA-Plan')).toBeTruthy()
            });

            it('should know when the Q2-UG-Plan sheet is not missing', function () {
                expect(scope.missingSheet('Q2-UG-Plan')).toBeFalsy()
            });
        });

    });


});
