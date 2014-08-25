'use strict';

describe('financials page', function () {

    var financialsPage = require('../pages/financialsPage.js');

    browser.get('#/financials');
    //spike route provider

    it('should know the region for which financials are being displayed', function () {
        expect(financialsPage.region()).toBe('Johannesburg Financials');
    });


});