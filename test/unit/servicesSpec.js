'use strict';

/* jasmine specs for services go here */

describe('service', function () {

    var service;
    beforeEach(module('financeApplication.services'));
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


    xdescribe("financials", function () {
        it("should know how to format financials for Johannesburg", function () {
            var netRevenue = {region: 'Johannesburg', data: [{
                "indicator": "Net Revenue",
                "serialNumber": 1,
                "type": "Currency",
                "values": [
                    {"period": "June", "amount":  423260.95, "type": "Plan"},
                    {"period": "June", "amount":  423260.95, "type": "Actual"}
                ]
            }]};
            expect(service.financialsFor('JHB')).toEqual(netRevenue);
        });
    });

});
