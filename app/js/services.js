'use strict';

/* Services */
angular.module('financeApplication.services', [])

    .factory('FinanceModel', ['XLSXReaderService', function (XLSXReaderService) {
        var financials;
        var sheets = XLSXReaderService.sheets();
        var regions = {JHB: 'Johannesburg', KPL: 'Kampala', PAN: 'Pan Africa'};
        var knownSheets = {plan: {JHB: 'Q2-ZA Plan', KPL: 'Q2-UG Plan'}, actual: {JHB: 'IS-ZA-Actuals', KPL: 'IS-UG-Actuals'}};

        var indicators = [
            {name: 'Net Revenue', plan: 'Net Revenue', actual: 'Net Revenue'},
            {name: 'Total Cost of Services', plan: 'Cost of Services', actual: 'Total Cost of Services'},
            {name: 'Gross Profit %', plan: 'Gross Margin %', actual: 'Gross Profit %'},
            {name: 'Total Operating Expenses', plan: 'OPEX', actual: 'Total Operating Expenses'},
            {name: 'Operating Contribution', plan: 'OC', actual: 'Operating Contribution'},
            {name: 'Client Gross Margin %', plan: 'CGM %', actual: 'Client Gross Margin %'}
        ];

        var amount = function (region, indicator, period, sheets) {
            var amount;
            var isPercentageValue = indicator.indexOf('%') > -1;

            if (region === 'PAN') {
                var jhbAmount = findValue(sheets['JHB'], indicator, period);
                var kplAmount = findValue(sheets['KPL'], indicator, period);

                var total = (jhbAmount + kplAmount) / 2 * 100;

                amount = isPercentageValue ? isNaN(total) ? 0 : total : jhbAmount + kplAmount || 0;
            }
            else {
                var value = findValue(sheets[region], indicator, period);
                amount = isPercentageValue ? isNaN(value) ? 0 : value * 100 : value;
            }
            return amount;

        };

        var findValue = function (sheet, row, column) {
            var rowKey = _.findKey(sheets[ sheet], {'h': row}).replace(/[A-Z]/g, '');
            var columnKey = _.findKey(sheets[sheet], {'h': column}).replace(/[0-9]/g, '');
            return sheets[sheet][columnKey + rowKey]['v'];
        };

        var formatPlan = function (date) {
            return date.format('MMM').toUpperCase();
        };

        var formatActual = function (date) {
            return date.format('MMMM');
        };

        var values = function (cumulative, region, indicator) {
            var result = [];

            var startDate = cumulative ? moment().startOf('year') : moment();
            var endDate = moment();

            while (startDate.month() <= endDate.month()) {
                var amountActual = amount(region, indicator.actual, formatActual(startDate), knownSheets['actual']);
                var amountPlan = amount(region, indicator.plan, formatPlan(startDate), knownSheets['plan']);

                result.push({"period": formatActual(startDate), "amount": amountPlan, "type": "Plan"});
                result.push({"period": formatActual(startDate), "amount": amountActual, "type": "Actual"});
                startDate = startDate.add(1, 'months');
            }
            return result;
        };

        var service = function() {

        };

        var data = function (region, cumulative){
            var serialNumber = 1;

            return _.transform(indicators, function (results, indicator) {
                var allValues = values(cumulative, region, indicator);
                var isPercentageValue = indicator.name.indexOf('%') > -1;
                var totalAmount = function (type) {

                    var valuesByType = _.filter(allValues, function(value) {
                        return value.type === type;
                    });

                    var totalAmount = _.reduce(valuesByType, function(sum, entry) {
                        return sum + parseFloat(entry.amount);
                    }, 0);
                    return isPercentageValue ? totalAmount / valuesByType.length : totalAmount;
                };

                results.push(
                    {
                        "indicator": indicator.name,
                        "serialNumber": serialNumber++,
                        "type": "Currency",
                        "values": allValues,
                        "ytd": {
                                  period: formatActual(moment()),
                                  amounts:{
                                            plan: totalAmount('Plan'),
                                            actual: totalAmount('Actual')
                                          }
                                }
                    }
                );
            })
        };

        service.financials = function (region, cumulative) {
            var type = cumulative ? 'Accumulative Financials' : 'Financials';
            if (region) {
                financials = {
                    region: regions[region],
                    type: type,
                    data: data(region, cumulative)
                };
            }
            return financials;

        };

        return service;

    }])
    .factory("XLSXReaderService", ['$q', function ($q) {
        var sheets;
        var service = function (data) {

        };

        var XLSXReader = function (file, handler) {
            var obj = {};
            XLSXReader.loadFile(obj, file, handler);
            return obj;
        };

        XLSXReader.loadFile = function (obj, file, handler) {

            var reader = new FileReader();

            reader.onload = function (e) {
                var data = e.target.result;
                var workbook = XLSX.read(data, {
                    type: 'binary'
                });

                obj = workbook.Sheets;
                sheets = workbook.Sheets;
                handler(obj);
            };

            reader.readAsBinaryString(file);
        };

        service.readFile = function (file) {

            var deferred = $q.defer();

            XLSXReader(file, function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        };

        service.sheets = function () {
            return sheets;
        };

        return service;
    }]);
