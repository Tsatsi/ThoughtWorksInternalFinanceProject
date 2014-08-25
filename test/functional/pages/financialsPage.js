var financialsPage = function () {

    var helpers = require('./helpers.js');

    this.region = function () {
        return element(by.css('#region')).getText();
    };

    this.backToUploadPage = function () {
        return element(by.css('#back-btn'));
    };

};
module.exports = new financialsPage();

