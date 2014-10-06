var utilizationAndBillRatesPage = function () {

    var helpers = require('./helpers.js');


    this.header = function () {
        return element(by.css('#utilization-table-header')).getText();
    };

    this.backToDashboard = function () {
        helpers.scrollThenClick(element(by.css('#back-btn')));
    }
};

module.exports = new utilizationAndBillRatesPage();

