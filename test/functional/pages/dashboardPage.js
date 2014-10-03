var dashboardPage = function () {

    var helpers = require('./helpers.js');
    var tilesIndex = {  FIN: {position: 0, description: 'Financials'},
                        YTD: {position: 1, description: 'YTD Financials'},
                        OPEX: {position: 2, description: 'OPEX'},
                        UTIL: {position: 3, description: 'Utilization and Bill Rates'}};

    var buttonsByRegion = {JHB: 1, KPL: 2, PA: 3};

    this.tileDisplayed = function (tile) {
        var tileObject = element.all(by.css('.financials-block h3')).get(tilesIndex[tile].position);
        return tileObject.getText().then(function (tileHeader) {
            return  tileHeader === tilesIndex[tile].description;
        });
    };

    this.tileButton = function (tile, region) {
        return element.all(by.css('.financials-block .financials-buttons a:nth-child(' + buttonsByRegion[region] + ')')).get(tilesIndex[tile].position);
    };

    this.financials = function (region) {
        helpers.scrollThenClick(this.tileButton('FIN', region));
    };

    this.backToHomePage = function () {
        helpers.scrollThenClick(element(by.css('#back-btn')));
    };
};

module.exports = new dashboardPage();

