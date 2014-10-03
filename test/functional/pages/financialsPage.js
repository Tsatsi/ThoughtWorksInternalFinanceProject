var financialsPage = function () {

    var helpers = require('./helpers.js');

    this.region = function () {
        return element(by.css('#financial-data .panel-heading')).getText();
    };

    this.backToDashboard = function () {
        helpers.scrollThenClick(element(by.css('#back-btn')));
    };


};
module.exports = new financialsPage();

