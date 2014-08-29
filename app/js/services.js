'use strict';

/* Services */
angular.module('financeApplication.services', [])
    .factory("XLSXReaderService", ['$q', function ($q) {
        var sheets, financials;
        var service = function (data) {

        };

        var XLSXReader = function (file, handler) {
            var obj = {};
            XLSXReader.loadFile(obj, file, handler);
            return obj;
        };

        var findValue = function (sheet, row, column) {
            var rowKey = _.findKey(sheets[ sheet], {'h': row}).replace(/[A-Z]/g, '');
            var columnKey = _.findKey(sheets[sheet], {'h': column}).replace(/[0-9]/g, '');
            return sheets[sheet][columnKey + rowKey]['v'];
        };

        var regions = {JHB: 'Johannesburg', KPL: 'Kampala', PAN: 'Pan Africa'};


        var knownSheets = {plan: {JHB : 'Q2-ZA Plan', KPL: 'Q2-UG Plan'}, actual: {JHB: 'IS-ZA-Actuals', KPL: 'IS-UG-Actuals'}};


        var indicators = [
            {name: 'Net Revenue', plan: 'Net Revenue', actual: 'Net Revenue'},
            {name: 'Total Cost of Services', plan: 'Cost of Services', actual: 'Total Cost of Services'},
            {name: 'Gross Profit %', plan: 'Gross Margin %', actual: 'Gross Profit %'},
            {name: 'Total Operating Expenses', plan: 'OPEX', actual: 'Total Operating Expenses'},
            {name: 'Operating Contribution', plan: 'OC', actual: 'Operating Contribution'},
            {name: 'Client Gross Margin %', plan: 'CGM %', actual: 'Client Gross Margin %'}
        ];

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

        var amount = function (region, indicator, period, sheets) {
            var amount;
            var isPercentageValue = indicator.indexOf('%') > -1;

            if (region === 'PAN') {
                var jhbAmount = findValue(sheets['JHB'], indicator, period);
                var kplAmount = findValue(sheets['KPL'], indicator, period);

                var total = (jhbAmount + kplAmount) / 2 * 100;

                amount = isPercentageValue ? isNaN(total) ?  0 : total : jhbAmount + kplAmount || 0;
            }
            else {
                var value = findValue(sheets[region], indicator, period);
                amount = isPercentageValue ? isNaN(value) ? 0 : value * 100 : value;
            }
            console.log(amount);
            return amount;

        };

        service.financials = function(region) {
            var serialNumber = 1;
            financials =  region == undefined ? financials : {region: regions[region], data: _.transform(indicators, function (results, indicator) {
                var periodActual = moment().format('MMMM');
                var periodPlan = moment().format('MMM').toUpperCase();
                results.push({
                    "indicator": indicator.name,
                    "serialNumber": serialNumber ++,
                    "type": "Currency",
                    "values": [
                        {"period": periodActual, "amount": amount(region, indicator.plan, periodPlan, knownSheets['plan']), "type": "Plan"},
                        {"period": periodActual, "amount": amount(region, indicator.actual, periodActual, knownSheets['actual']), "type": "Actual"}
                    ]
                });
            })};
            return financials;
        };

        service.sheets = function () {
          return sheets;
        };

        return service;
    }]);
