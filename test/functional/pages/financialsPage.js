var financialsPage = function () {

    var helpers = require('./helpers.js');

    this.region = function () {
        return element(by.css('#region')).getText();
    }

};
module.exports = new financialsPage();

