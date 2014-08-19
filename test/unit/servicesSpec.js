'use strict';

/* jasmine specs for services go here */

describe('service', function () {

    var service;
    beforeEach(module('myApp.services'));
    beforeEach(inject(function (XLSXReaderService) {

        service = XLSXReaderService;

    }));

    describe('xlsx reader service', function () {

        describe('#read file', function () {

            it('should be defined', function () {
                expect(service.readFile).toBeDefined();
            });
        });
    });

});
