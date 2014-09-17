'use strict';

/* Services */
angular.module('financeApplication.services', [])
    .factory('FinanceModel', ['XLSXReaderService', function (XLSXReaderService) {
        var financials;
        var sheets = XLSXReaderService.sheets();
        var regions = {JHB: 'Johannesburg', KPL: 'Kampala', PAN: 'Pan Africa'};
        var knownSheets = {plan: {JHB: 'Q2-ZA Plan', KPL: 'Q2-UG Plan'}, actual: {JHB: 'IS-ZA-Actuals', KPL: 'IS-UG-Actuals'}};
        var indicatorList = [];

        var indicators = {FINANCIALS: [
            {name: 'Net Revenue', plan: 'Net Revenue', actual: 'Net Revenue'},
            {name: 'Total Cost of Services', plan: 'Cost of Services', actual: 'Total Cost of Services'},
            {name: 'Gross Profit %', plan: 'Gross Margin %', actual: 'Gross Profit %'},
            {name: 'Total Operating Expenses', plan: 'OPEX', actual: 'Total Operating Expenses'},
            {name: 'Operating Contribution', plan: 'OC', actual: 'Operating Contribution'},
            {name: 'Client Gross Margin %', plan: 'CGM %', actual: 'Client Gross Margin %'}
        ],  OPEX:[
            {name: 'Business Development', plan: 'Business Development', actual: 'Business Development'},
            {name:  'Engagement & Account Management', plan: 'E&AM', actual: 'Engagement & Account Management'},
            {name:  'Marketing', plan: 'Marketing', actual: 'Marketing'},
            {name:  'Recruiting', plan: 'Recruiting', actual: 'Recruiting'},
            {name:  'IS Infrastructure', plan: 'IS Infrastrucure', actual: 'IS Infrastrucure'},
            {name:  'People Development', plan: 'People Development', actual: 'People Development'},
            {name:  'General & Administrative', plan: 'General & Administrative', actual: 'General & Administrative'}
        ]};

        var amount = function (region, indicator, period, sheets, columnKey) {
            var amount;
            var isPercentageValue = indicator.indexOf('%') > -1;

            if (region === 'PAN') {
                var jhbAmount = findValue(sheets['JHB'], indicator, period, columnKey);
                var kplAmount = findValue(sheets['KPL'], indicator, period, columnKey);

                var total = (jhbAmount + kplAmount) / 2 * 100;

                amount = isPercentageValue ? isNaN(total) ? 0 : total : jhbAmount + kplAmount || 0;
            }
            else {
                var value = findValue(sheets[region], indicator, period, columnKey);
                amount = isPercentageValue ? isNaN(value) ? 0 : value * 100 : value;
            }
            return amount;

        };

        var findValue = function (sheet, row, column, columnKey) {
            var rowKey = _.findKey(sheets[ sheet], {'h': row}).replace(/[A-Z]/g, '');
            var colKey = columnKey(sheet, column).replace(/[0-9]/g, '');
            return sheets[sheet][colKey + rowKey]['v'];
        };

        var endDate = function () {

            var sheet = sheets[knownSheets['actual']['JHB']];
            var sheetHeader = _.find(sheet, function (b){return b['h'] && b['h'].indexOf('Period Ended') > -1})['h'];
            var months = moment.months();
            var reportingMonth = _.find(months, function (month) {
                return sheetHeader.indexOf(month) > -1;
            });
            return moment(reportingMonth, 'MMM');

        };


        var formatPlan = function (date) {
            return date.format('MMM').toUpperCase();
        };

        var formatActual = function (date) {
            return date.format('MMMM');
        };

        var values = function (cumulative, region, indicator) {
            var result = [];

            var startDate = cumulative ? moment().startOf('year') : endDate();

            while (startDate.month() <= endDate().month()) {
                var amountActual = amount(region, indicator.actual, formatActual(startDate), knownSheets['actual'], columnKeyActual);
                var amountPlan = amount(region, indicator.plan, formatPlan(startDate), knownSheets['plan'], columnKeyPlan);

                result.push({"period": formatActual(startDate), "amount": amountPlan, "type": "Plan"});
                result.push({"period": formatActual(startDate), "amount": amountActual, "type": "Actual"});
                startDate = startDate.add(1, 'months');
            }
            return result;
        };

        var service = function() {

        };

        var columnKeyActual = function (sheet, column) {
            return _.findKey(sheets[sheet], {'h': column});
        };

        var columnKeyPlan = function (sheet, column) {
            var keys = [];
            _.forEach(sheets[sheet], function (val, key) {
                if (val.v == column) {
                    keys.push(key)
                }
            });

            var modifiedKeys = _.map(keys, function (num) {
                return num.replace(/[0-9]/g, '') + (parseInt(num.replace(/[A-Z]/g, '')) - 1)
            });

            return _.find(modifiedKeys, function (key) {
                if (moment().format('YYYY') == sheets[sheet][key].v) {
                    return key;
                }
            })
        };

        var data = function (region, cumulative, indicatorType){

            var serialNumber = 1;

            return _.transform(indicators[indicatorType], function (results, indicator) {
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
                        "type": indicator.name.indexOf('%') > -1 ? 'Percentage':'Currency',
                        "values": allValues,
                        "ytd": {
                            period: formatActual(endDate()),
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
            var type = cumulative ? 'YTD Financials' : 'Financials';
            if (region) {
                financials = {
                    region: regions[region],
                    type: type,
                    data: data(region, cumulative, 'FINANCIALS')
                };
            }
            return financials;

        };

        service.indicator = function(region, indicatorType){
            var serialNumbers = {'Utilization': 7, 'Average Bill Rate': 8};
            var indicator = {};


            var indicatorForRegion = function() {
                return _.transform(indicatorList, function (result, indicator) {
                    if (indicator.region === region && indicator.type === indicatorType) {
                        var indicatorForRegion = {
                            "indicator": indicator.type,
                            "serialNumber": serialNumbers[indicator.type],
                            "values": { plan: indicator.plan, actual: indicator.actual}
                        };
                        result.push(indicatorForRegion);
                    }
                })[0];
            };

            var totalAmounts = function (indicator){

                var validIndicators = _.filter(indicatorList, function(_indicator){
                    return indicator === _indicator.type;
                });

                var totalPlan = 0;
                var totalActual = 0;
                _.forEach(validIndicators, function (element) {
                    totalPlan += element.plan;
                    totalActual += element.actual;
                });
                var numberOfRegions = validIndicators.length;
                return { "plan": totalPlan/numberOfRegions, "actual": totalActual/numberOfRegions};

            };

            var indicatorForAllRegions = function () {
                return {
                            "indicator": indicatorType,
                            "serialNumber": serialNumbers[indicatorType],
                            "values": totalAmounts(indicatorType)
                    };
            };

            if (region == 'Pan Africa') {
                indicator = indicatorForAllRegions();
            }
            else {
                indicator = indicatorForRegion() || {"values": {}};
            }
            return indicator;

        };

        service.clearIndicators = function () {
            indicatorList =_.remove(indicatorList, function(element) {
                return !(element.region === financials.region);
            });
        };

        service.addIndicator = function (indicator) {
            indicatorList =_.remove(indicatorList, function(element) {
                return !(element.region === indicator.region && element.type === indicator.type);
            });
            if (indicator.plan && indicator.actual) {
                indicatorList.push(indicator);
            }
        };

        service.opex = function(region){
            if (region) {
                financials = {
                    region: regions[region],
                    type: 'Operating Expenses',
                    data: data(region, false, 'OPEX')
                };
            }
            return financials;
        };

        service.indicatorsCaptured = function () {
            return indicatorList.length === 4;
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
