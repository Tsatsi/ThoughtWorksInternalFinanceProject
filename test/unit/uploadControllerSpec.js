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

            it('should read the contents of the file', function () {
                var expectedSheets = ['sheet 1', 'sheet 2'];
                simulateUpload(expectedSheets);
                expect(readerService.readFile).toHaveBeenCalled();
            });

            it('should know all the sheets in the uploaded file', function () {
                var expectedSheets = ['sheet 1', 'sheet 2'];
                simulateUpload(expectedSheets);
                expect(scope.sheets).toBe(expectedSheets);
            });

            it('should know when the file is successfully uploaded', function () {
                var expectedSheets = [
                    {'IS-ZA-Actuals': {}},
                    {'IS-UG-Actuals': {}},
                    {'Q2-ZA Plan': {}},
                    {'Q2-UG Plan': {}}
                ];
                simulateUpload(expectedSheets);
                var message = scope.printSuccessMessage();
                expect(message).toEqual('Successfully uploaded file')
            });

            it('should know when the IS-UG-Actuals and Q2-ZA-Plan sheet are missing', function () {
                var expectedSheets = [
                    {'IS-ZA-Actuals': {}}

                ];
                simulateUpload(expectedSheets);
                var message = scope.printSuccessMessage();
                expect(message).toEqual('The excel file uploaded does not contain IS-UG-Actuals, Q2-ZA Plan, Q2-UG Plan')
            });

            var simulateUpload = function (expectedSheets) {
                var deferred = q.defer();
                deferred.resolve(expectedSheets);
                spyOn(readerService, 'readFile').andReturn(deferred.promise);
                scope.upload('filename');
                scope.$digest();
            }
        });
    });
});
