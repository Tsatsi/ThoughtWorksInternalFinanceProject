'use strict';

/* jasmine specs for services go here */

describe('service', function () {

    var service, financeModel;
    beforeEach(module('financeApplication.services'));
    beforeEach(inject(function (XLSXReaderService, FinanceModel) {

        service = XLSXReaderService;
        financeModel = FinanceModel;

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

    describe('indicator and bill rate', function(){
        it('should return indicator data when indicator has been added', function(){

            var expectedUtilization = {
                "indicator": 'Utilization',
                "serialNumber": 7,
                "values": { plan: 1, actual: 2}
            };

            var utilization =  {region: 'JHB', 'plan': 1, 'actual':2, type:'Utilization'};
            financeModel.addIndicator(utilization);
            expect(financeModel.indicator('JHB', 'Utilization')).toEqual(expectedUtilization);

        });

        it('should make sure that there is only one indicator per region', function () {
            var expectedUtilization = {
                "indicator": 'Utilization',
                "serialNumber": 7,
                "values": { plan: 5, actual: 7}
            };


            var firstUtilization =  {region: 'JHB', 'plan': 1, 'actual':2, type:'Utilization'};
            var secondUtilization =  {region: 'JHB', 'plan': 5, 'actual':7, type:'Utilization'};
            financeModel.addIndicator(firstUtilization);
            financeModel.addIndicator(secondUtilization);
            expect(financeModel.indicator('JHB', 'Utilization')).toEqual(expectedUtilization);
        });

        it('should be able to add another indicator for another region', function(){

            var expectedJhbUtilization = {
                "indicator": 'Utilization',
                "serialNumber": 7,
                "values": { plan: 6, actual: 6}
            };
            var expectedKplUtilization = {
                "indicator": 'Utilization',
                "serialNumber": 7,
                "values": { plan: 3, actual: 2}
            };

            var jhbUtilization =  {region: 'JHB', 'plan': 6, 'actual':6, type:'Utilization'};
            var kplUtilization =  {region: 'KPL', 'plan': 3, 'actual':2, type:'Utilization'};
            financeModel.addIndicator(jhbUtilization);
            financeModel.addIndicator(kplUtilization);
            expect(financeModel.indicator('JHB', 'Utilization')).toEqual(expectedJhbUtilization);
            expect(financeModel.indicator('KPL', 'Utilization')).toEqual(expectedKplUtilization);

        });

        var expectedBillRate = {
            "indicator": 'Average Bill Rate',
            "serialNumber": 8,
            "values": { plan: 5, actual: 7}
        };

        it('should return bill rate when bill rate has been added', function(){
            financeModel.addIndicator({region: 'JHB', 'plan': 5, 'actual':7, type:'Average Bill Rate'});
            expect(financeModel.indicator('JHB', 'Average Bill Rate')).toEqual(expectedBillRate);

        });

        it('should make sure that there is only one bill rate per region', function () {
            financeModel.addIndicator({region: 'JHB', 'plan': 1, 'actual':2, type:'Average Bill Rate'});
            financeModel.addIndicator({region: 'JHB', 'plan': 5, 'actual':7, type:'Average Bill Rate'});
            expect(financeModel.indicator('JHB', 'Average Bill Rate')).toEqual(expectedBillRate);
        });

        it('should be able to add another bill rate for another region', function(){

            var expectedJhbBillRate = {
                "indicator": 'Average Bill Rate',
                "serialNumber": 8,
                "values": { plan: 6, actual: 6}
            };
            var expectedKplBillRate = {
                "indicator": 'Average Bill Rate',
                "serialNumber": 8,
                "values": { plan: 3, actual: 2}
            };

            financeModel.addIndicator({region: 'JHB', 'plan': 6, 'actual':6, type:'Average Bill Rate'});
            financeModel.addIndicator({region: 'KPL', 'plan': 3, 'actual':2, type:'Average Bill Rate'});
            expect(financeModel.indicator('JHB', 'Average Bill Rate')).toEqual(expectedJhbBillRate);
            expect(financeModel.indicator('KPL', 'Average Bill Rate')).toEqual(expectedKplBillRate);

        });

        it('should be able to calculate the total average bill rate for all regions', function () {
            var expectedPanAfricaBillRate = {
                "indicator": 'Average Bill Rate',
                "serialNumber": 8,
                "values": { plan: 3, actual: 3}
            };

            financeModel.addIndicator({region: 'JHB', 'plan': 3, 'actual':4, type:'Average Bill Rate'});
            financeModel.addIndicator({region: 'KPL', 'plan': 3, 'actual':2, type:'Average Bill Rate'});
            expect(financeModel.indicator('Pan Africa', 'Average Bill Rate')).toEqual(expectedPanAfricaBillRate);

        });

        it('', function () {
            var expectedJhbBillRate = {
                "indicator": 'Average Bill Rate',
                "serialNumber": 8,
                "values": { plan: 6, actual: 6}
            };
            var expectedKplUtilization = {
                "indicator": 'Utilization',
                "serialNumber": 7,
                "values": { plan: 3, actual: 2}
            };

            financeModel.addIndicator({region: 'JHB', 'plan': 6, 'actual':6, type:'Average Bill Rate'});
            financeModel.addIndicator({region: 'JHB', 'plan': 3, 'actual':2, type:'Utilization'});
            expect(financeModel.indicator('JHB', 'Average Bill Rate')).toEqual(expectedJhbBillRate);
            expect(financeModel.indicator('JHB', 'Utilization')).toEqual(expectedKplUtilization);
        });


    });

});
