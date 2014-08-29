'use strict';


describe('UploadController', function () {

//    var fs = require('fs');
    var controller, scope, readerService, q, location, data;

    beforeEach(module('financeApplication.controllers', 'financeApplication.services', 'served/data.json'));
    beforeEach(inject(function ($rootScope, $controller, XLSXReaderService, $q, $location, _servedData_) {
        scope = $rootScope.$new();
        controller = $controller('UploadController', {$scope: scope});
        readerService = XLSXReaderService;
        q = $q;
        location = $location;
        data = _servedData_;

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

            it('should know when an upload is complete', function () {
                var expectedSheets = ['sheet 1', 'sheet 2'];
                simulateUpload(expectedSheets);
                expect(scope.uploadComplete).toBeTruthy();
            });

            it('should know all the sheets in the uploaded file', function () {
                var expectedSheets = ['sheet 1', 'sheet 2'];
                simulateUpload(expectedSheets);
                expect(scope.sheets).toBe(expectedSheets);
            });

            it('should know when the file is successfully uploaded', function () {

                var expectedSheets = {'IS-ZA-Actuals': {}, 'IS-UG-Actuals': {}, 'Q2-ZA Plan': {}, 'Q2-UG Plan': {}};

                spyOn(readerService, 'sheets').andReturn(expectedSheets);
                var message = scope.uploadConfirmationMessage();
                expect(message).toEqual('Successfully uploaded file')
            });

            it('should know when the IS-UG-Actuals and Q2-ZA-Plan sheet are missing', function () {
                var expectedSheets = {'IS-ZA-Actuals': {}};
                spyOn(readerService, 'sheets').andReturn(expectedSheets);
                var message = scope.uploadConfirmationMessage();
                expect(message).toEqual('The excel file uploaded does not contain IS-UG-Actuals, Q2-ZA Plan, Q2-UG Plan')
            });

            it('should apply error style when an upload is not successful', function () {
                scope.uploadSuccessful =  function () {
                    return false;
                };
                expect(scope.messageStyle()).toBe('alert alert-danger alert-error');
            });

            it('should apply success style when an upload is not successful', function () {
                scope.uploadSuccessful =  function () {
                    return true;
                };
                expect(scope.messageStyle()).toBe('alert alert-success');
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

    describe('financials', function () {

        it("should know how to go back to the upload page", function () {
            scope.backToUploadPage();
            expect(location.absUrl()).toContain('upload');
        });

    });


});
