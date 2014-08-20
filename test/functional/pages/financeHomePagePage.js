var financeHomePagePage = function () {

    var helpers = require('./helpers.js');

    this.pageTitle = function () {
        return browser.getTitle();
    };

    this.header = function () {
      return element(by.css('.intro')).getText();
    };

    this.uploadButtonPresent = function () {
        return element(by.css('#upload-btn')).isPresent();
    };

    this.uploadButtonValue = function () {
        return element(by.css('.btn-file')).getText();
    };

    this.successNotification = function () {
        return element(by.css('.alert-success')).getText();
    };

    this.errorNotification = function () {
        return element(by.css('.alert-error')).getText();
    };
};

module.exports = new financeHomePagePage();

