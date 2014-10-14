var utilizationAndBillRatesPage = function () {

    var helpers = require('./helpers.js');


    this.header = function () {
        return element(by.css('#utilization-table-header')).getText();
    };

    this.backToDashboard = function () {
        helpers.scrollThenClick(element(by.css('#back-btn')));
    };

    this.successNotification = function () {
        return element(by.css('.alert-success')).getText();
    };

    this.enterAndSaveValidUtilizationValues = function () {

    };

    this.saveButton = function () {
        return element(by.css('#save-btn'));
    }
};

module.exports = new utilizationAndBillRatesPage();

