var financeHomePagePage = function () {

    var helpers = require('./helpers.js');
    var  path = require('' +
        '' +
        'path');
    var validFilePath = '../../../app/assets/input-valid.xlsx';
    var invalidFilePath = '../../../app/assets/input-invalid.xlsx';

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

    var uploadFile = function (filePath) {
        var absolutePath = path.resolve(__dirname, filePath);
        element(by.css('input[type="file"]')).sendKeys(absolutePath);
    };

    this.uploadValidFile = function () {
        uploadFile(validFilePath);
    };

    this.uploadInvalidFile = function () {
        uploadFile(invalidFilePath);
    };

};

module.exports = new financeHomePagePage();

