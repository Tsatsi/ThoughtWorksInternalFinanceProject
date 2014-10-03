'use strict';

describe('financials page', function () {

    var financeHomePagePage = require('../pages/financeHomePagePage.js');
    var financialsPage = require('../pages/financialsPage.js');
    var dashboardPage = require('../pages/dashboardPage.js');

    beforeEach(function () {
        browser.get('index.html');
        financeHomePagePage.uploadValidFile();
        dashboardPage.financials('JHB');
    });

    it('should know the region for which financials are being displayed', function () {
        expect(financialsPage.region()).toBe('Johannesburg Financials');
    });

    it("should redirect back to the dashboard page", function () {
        financialsPage.backToDashboard();
        expect(browser.getCurrentUrl()).toContain('dashboard');

    });

});